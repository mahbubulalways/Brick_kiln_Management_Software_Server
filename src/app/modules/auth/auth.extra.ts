import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { IAuth } from "./auth.interface";

const LOGIN_MAX_TRIES = 10;
const LOGIN_BLOCK_HOURS = 24;
const LOGIN_BLOCK_MS = LOGIN_BLOCK_HOURS * 60 * 60 * 1000;

export const checkLoginLimit = async (userId: string) => {
  const loginLimit = await prisma.loginLimit.findUnique({
    where: { userId },
  });

  if (!loginLimit || !loginLimit.status) return;

  if (!loginLimit.blockTime) {
    await prisma.loginLimit.update({
      where: { userId },
      data: {
        totalTry: 0,
        status: false,
        blockTime: null,
      },
    });

    return;
  }

  const unblockTime = loginLimit?.blockTime?.getTime() + LOGIN_BLOCK_MS;
  if (Date.now() < unblockTime) {
    throw new AppError(
      StatusCodes.TOO_MANY_REQUESTS,
      "ভুল পাসওয়ার্ডের কারণে অ্যাকাউন্ট ২৪ ঘণ্টার জন্য ব্লক।",
    );
  }

  await prisma.loginLimit.update({
    where: { userId },
    data: {
      totalTry: 0,
      status: false,
      blockTime: null,
    },
  });
};

export const createLoginHistory = async (
  userId: string,
  payload: IAuth,
  status: boolean,
) => {
  return prisma.loginHistory.create({
    data: {
      type: "Login",
      device: payload.extra?.device || "Unknown",
      browser: payload.extra?.browser || "Unknown",
      ipAddress: payload.ip || "Unknown",
      userId,
      status,
    },
  });
};

export const recordFailedLoginAttempt = async (userId: string) => {
  const now = new Date();

  await prisma.loginLimit.upsert({
    where: { userId },
    create: {
      userId,
      totalTry: 0,
      status: false,
      blockTime: null,
    },
    update: {},
  });

  return prisma.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<
      {
        totalTry: number;
        status: boolean;
        blockTime: Date;
      }[]
    >`
      SELECT "totalTry", "status", "blockTime"
      FROM "LoginLimit"
      WHERE "userId" = ${userId}
      FOR UPDATE
    `;

    const loginLimit = rows[0];

    if (!loginLimit) {
      throw new Error("LoginLimit record not found");
    }

    const unblockTime = loginLimit?.blockTime?.getTime() + LOGIN_BLOCK_MS;

    if (loginLimit?.status && now.getTime() < unblockTime) {
      return {
        totalTry: loginLimit.totalTry,
        isBlocked: true,
      };
    }

    const currentTry =
      loginLimit.status || now.getTime() >= unblockTime
        ? 0
        : loginLimit.totalTry;

    const totalTry = currentTry + 1;
    const isBlocked = totalTry >= LOGIN_MAX_TRIES;

    await tx.loginLimit.update({
      where: { userId },
      data: {
        totalTry,
        status: isBlocked,
        ...(isBlocked ? { blockTime: now } : {}),
      },
    });

    return { totalTry, isBlocked };
  });
};

export const resetLoginLimit = async (userId: string) => {
  await prisma.loginLimit.updateMany({
    where: { userId },
    data: {
      totalTry: 0,
      status: false,
    },
  });
};
