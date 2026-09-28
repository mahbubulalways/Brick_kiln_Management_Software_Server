"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ledgerModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const ledger__service_1 = require("../../ledger/ledger..service");
const prisma_1 = require("../../../../helpers/prisma");
const ledgerModule = async (user, findRequest, approvalId) => {
    if (findRequest.action === "UPDATE") {
        if (!findRequest) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।");
        }
        const newData = findRequest.newData;
        const result = await ledger__service_1.LedgerService.updateLedgerService(user, findRequest?.targetId, newData);
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
            message: "খতিয়ান আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    if (findRequest.action === "DELETE") {
        const result = await ledger__service_1.LedgerService.deleteLedgerService(user, findRequest.targetId);
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
            message: "খতিয়ান মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
};
exports.ledgerModule = ledgerModule;
