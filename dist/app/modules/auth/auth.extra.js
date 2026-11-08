"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetLoginLimit = exports.recordFailedLoginAttempt = exports.createLoginHistory = exports.checkLoginLimit = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const LOGIN_MAX_TRIES = 10;
const LOGIN_BLOCK_HOURS = 24;
const LOGIN_BLOCK_MS = LOGIN_BLOCK_HOURS * 60 * 60 * 1000;
const checkLoginLimit = async (userId) => {
    const loginLimit = await prisma_1.prisma.loginLimit.findUnique({
        where: { userId },
    });
    if (!loginLimit || !loginLimit.status)
        return;
    if (!loginLimit.blockTime) {
        await prisma_1.prisma.loginLimit.update({
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
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS, "ভুল পাসওয়ার্ডের কারণে অ্যাকাউন্ট ২৪ ঘণ্টার জন্য ব্লক।");
    }
    await prisma_1.prisma.loginLimit.update({
        where: { userId },
        data: {
            totalTry: 0,
            status: false,
            blockTime: null,
        },
    });
};
exports.checkLoginLimit = checkLoginLimit;
const createLoginHistory = async (userId, payload, status) => {
    return prisma_1.prisma.loginHistory.create({
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
exports.createLoginHistory = createLoginHistory;
const recordFailedLoginAttempt = async (userId) => {
    const now = new Date();
    await prisma_1.prisma.loginLimit.upsert({
        where: { userId },
        create: {
            userId,
            totalTry: 0,
            status: false,
            blockTime: null,
        },
        update: {},
    });
    return prisma_1.prisma.$transaction(async (tx) => {
        const rows = await tx.$queryRaw `
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
        const currentTry = loginLimit.status || now.getTime() >= unblockTime
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
exports.recordFailedLoginAttempt = recordFailedLoginAttempt;
const resetLoginLimit = async (userId) => {
    await prisma_1.prisma.loginLimit.updateMany({
        where: { userId },
        data: {
            totalTry: 0,
            status: false,
        },
    });
};
exports.resetLoginLimit = resetLoginLimit;
