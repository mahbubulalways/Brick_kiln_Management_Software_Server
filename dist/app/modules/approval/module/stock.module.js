"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const prisma_1 = require("../../../../helpers/prisma");
const stock_book_service_1 = require("../../stock_book/stock_book.service");
const stockModule = async (user, findRequest, approvalId) => {
    if (!findRequest) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
    }
    if (findRequest.action === "DELETE") {
        const result = await stock_book_service_1.StockBookService.deleteStockService(user, findRequest.targetId);
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
            message: "স্টকের তথ্য মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
exports.stockModule = stockModule;
