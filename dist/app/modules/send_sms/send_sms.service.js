"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSmsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const smsService_1 = require("../../service/smsService");
const getVatasSendMessageService = async (user) => {
    const result = await prisma_1.prisma.smsLog.findMany({
        where: { vataId: user.vataId },
    });
    return result;
};
const sendMessageToUserService = async (user, payload) => {
    const messageEquity = await prisma_1.prisma.smsWallet.findFirst({
        where: {
            vataId: user.vataId,
        },
    });
    console.log(messageEquity);
    if (!messageEquity) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপনার SMS Wallet পাওয়া যায়নি।");
    }
    if (messageEquity.totalUsed >= messageEquity.totalPurchased) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপনার SMS পাঠানোর সীমা শেষ হয়ে গেছে।");
    }
    const customer = await prisma_1.prisma.customer.findFirst({
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
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গ্রাহক পাওয়া যায়নি।");
    }
    if (!customer.phoneNumber) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "গ্রাহকের মোবাইল নম্বর পাওয়া যায়নি।");
    }
    const response = await (0, smsService_1.sendSmsToPhoneNumbers)([customer.phoneNumber], payload.message);
    if (!response) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "SMS পাঠানো যায়নি।");
    }
    const result = await prisma_1.prisma.smsLog.create({
        data: {
            cost: messageEquity.currentRate,
            message: payload.message,
            phoneNumber: customer.phoneNumber,
            sendBy: user.userId,
            status: "SENT",
            vataId: user.vataId,
        },
    });
    console.log(result);
    await prisma_1.prisma.smsWallet.update({
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
exports.SendSmsService = {
    getVatasSendMessageService,
    sendMessageToUserService,
};
