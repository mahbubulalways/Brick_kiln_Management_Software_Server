"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodRefundService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const createRefundGoodService = async (req) => {
    const file = req.file || null;
    const body = JSON.parse(req.body.data);
    const issue = await prisma_1.prisma.goodsIssue.findFirst({
        where: {
            id: body.issueId,
        },
        select: {
            name: true,
            goodId: true,
        },
    });
    if (!issue) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "মালামাল ইস্যুর তথ্য পাওয়া যায়নি।");
    }
    const good = await prisma_1.prisma.goodsStock.findFirst({
        where: {
            id: issue.goodId,
        },
        select: {
            price: true,
        },
    });
    if (!good) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "মালামালের তথ্য পাওয়া যায়নি।");
    }
    const goodQuantity = Number(body.goodQuantity || 0);
    const damagedQuantity = Number(body.damagedQuantity || 0);
    const lostQuantity = Number(body.lostQuantity || 0);
    const totalQuantity = goodQuantity +
        damagedQuantity +
        lostQuantity;
    if (totalQuantity <= 0) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "কমপক্ষে একটি মালামালের পরিমাণ দিতে হবে।");
    }
    const price = Number(good.price);
    await prisma_1.prisma.$transaction(async (tx) => {
        if (lostQuantity > 0) {
            await tx.goodsLoss.create({
                data: {
                    lossAmount: lostQuantity * price,
                    quantity: lostQuantity,
                    type: "LOST",
                    goodId: issue.goodId,
                },
            });
        }
        if (damagedQuantity > 0) {
            await tx.goodsLoss.create({
                data: {
                    lossAmount: damagedQuantity * price,
                    quantity: damagedQuantity,
                    type: "DAMAGED",
                    goodId: issue.goodId,
                },
            });
        }
        await tx.goodHistoryLog.create({
            data: {
                date: body.date,
                quantity: totalQuantity,
                returnBy: body.name,
                type: "RETURN",
                goodId: issue.goodId,
                receiveBy: issue.name,
                image: file?.filename || null,
                damage: damagedQuantity,
                lost: lostQuantity,
                okay: goodQuantity,
            },
        });
        await tx.goodsIssue.delete({
            where: {
                id: body.issueId,
            },
        });
    });
    return {
        success: true,
    };
};
exports.GoodRefundService = {
    createRefundGoodService,
};
