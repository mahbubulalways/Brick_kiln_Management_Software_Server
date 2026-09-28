"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const payment_service_1 = require("../../payment/payment.service");
const prisma_1 = require("../../../../helpers/prisma");
const paymentModule = async (user, findRequest, approvalId) => {
    if (findRequest.action === "UPDATE") {
        if (!findRequest.newData) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।");
        }
        const newData = findRequest.newData;
        const result = await payment_service_1.PaymentService.updatePaymentService(user, null, newData, findRequest?.targetId);
        await prisma_1.prisma.approvalRequest.update({
            where: {
                id: approvalId,
            },
            data: {
                status: "APPROVED",
                reviewedAt: new Date(),
            },
        });
        return {
            result,
            message: "পেমেন্ট আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    if (findRequest.action === "DELETE") {
        const result = await payment_service_1.PaymentService.deletePaymentServie(user, findRequest.targetId);
        await prisma_1.prisma.approvalRequest.update({
            where: {
                id: approvalId,
            },
            data: {
                status: "APPROVED",
                reviewedAt: new Date(),
            },
        });
        return {
            result,
            message: "পেমেন্ট মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
};
exports.paymentModule = paymentModule;
