"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodIssueService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const createGoodIssueService = async (req) => {
    const file = req?.file || null;
    const body = JSON.parse(req.body.data);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const result = await tx.goodsIssue.create({
            data: {
                date: body.date,
                location: body.location,
                name: body.name,
                image: file?.filename || null,
                quantity: Number(body.quantity),
                goodId: body.goodId,
                note: body.note
            }
        });
        await tx.goodHistoryLog.create({
            data: {
                date: body.date,
                receiveBy: body.name,
                quantity: Number(body.quantity),
                type: "ISSUE",
                goodId: body.goodId,
                image: file?.filename || null,
            }
        });
        return result;
    });
    return result;
};
// GET ALL ISSUE
const getAllGoodIssueService = async (user) => {
    const result = await prisma_1.prisma.goodsIssue.findMany({
        where: {
            good: {
                vataId: user.vataId
            }
        },
        include: {
            good: {
                select: {
                    name: true,
                    image: true,
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    return result;
};
// GET SINGLE ISSUE
const getSingleGoodIssueService = async (user, id) => {
    const result = await prisma_1.prisma.goodsIssue.findFirst({
        where: {
            good: {
                vataId: user.vataId
            },
            id
        },
        select: {
            date: true,
            id: true,
            name: true,
            quantity: true,
            good: {
                select: {
                    name: true,
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    return result;
};
// GOODS ISSUE HISTORY LOG
const getGoodsIssueHistoryLogs = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.goodHistoryLog.findMany({
            where: {
                good: {
                    vataId: user.vataId
                }
            },
            include: {
                good: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            skip,
            take: limit
        }),
        prisma_1.prisma.goodHistoryLog.count({
            where: {
                good: {
                    vataId: user.vataId
                }
            },
        })
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        data: result,
        meta
    };
};
exports.GoodIssueService = {
    createGoodIssueService,
    getAllGoodIssueService,
    getSingleGoodIssueService,
    getGoodsIssueHistoryLogs
};
