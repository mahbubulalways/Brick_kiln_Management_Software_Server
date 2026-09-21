import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import { AppError } from "../../errors/ApplicationError";
import { sendSmsToPhoneNumbers } from "../../service/smsService";

const getVatasSendMessageService = async (user: TAuthUser) => {
  const result = await prisma.smsLog.findMany({
    where: { vataId: user.vataId },
  });
  return result;
};

const sendMessageToUserService = async (
  user: TAuthUser,
  payload: { customerId: string; message: string },
) => {
  const messageEquity = await prisma.smsWallet.findFirst({
    where: {
      vataId: user.vataId,
    },
  });
  if (!messageEquity) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "আপনার SMS Wallet পাওয়া যায়নি।",
    );
  }

  if (messageEquity.totalUsed >= messageEquity.totalPurchased) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "আপনার SMS পাঠানোর সীমা শেষ হয়ে গেছে।",
    );
  }

  const customer = await prisma.customer.findFirst({
    where: {
      customerCode: payload.customerId,
      vataId: user.vataId,
    },
    select: {
      id: true,
      phoneNumber: true,
    },
  });

  if (!customer) {
    throw new AppError(StatusCodes.NOT_FOUND, "গ্রাহক পাওয়া যায়নি।");
  }

  if (!customer.phoneNumber) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "গ্রাহকের মোবাইল নম্বর পাওয়া যায়নি।",
    );
  }

  const response = await sendSmsToPhoneNumbers(
    [customer.phoneNumber],
    payload.message,
  );

  if (!response) {
    throw new AppError(StatusCodes.BAD_REQUEST, "SMS পাঠানো যায়নি।");
  }

  const result = await prisma.smsLog.create({
    data: {
      cost: messageEquity.currentRate,
      message: payload.message,
      phoneNumber: customer.phoneNumber,
      sendBy: user.userId,
      status: "SENT",
      vataId: user.vataId,
    },
  });
  await prisma.smsWallet.update({
    where: {
      vataId: user.vataId,
    },
    data: {
      balance: {
        decrement: messageEquity.currentRate,
      },
      totalUsed: {
        increment: 1,
      },
    },
  });

  return result;
};

export const SendSmsService = {
  getVatasSendMessageService,
  sendMessageToUserService,
};
