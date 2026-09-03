import { Request } from "express";
import { GoodsIssue, Prisma } from "../../../generated/prisma/client";
import { TAuthUser } from "../../../interface/token";
import { TGoodIssue } from "./good_issue.interface";
import { IUploadFile } from "../../../interface/multer";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";

const createGoodIssueService = async (req: Request) => {
    const file = req?.file as IUploadFile || null;
    const body = JSON.parse(req.body.data) as TGoodIssue;
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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
        })

        await tx.goodHistoryLog.create({
            data: {
                date: body.date,
                receiveBy: body.name,
                quantity: Number(body.quantity),
                type: "ISSUE",
                goodId: body.goodId,
                image: file?.filename || null,

            }
        })
        return result
    })

    return result
}

// GET ALL ISSUE
const getAllGoodIssueService = async (user: TAuthUser) => {
    const result = await prisma.goodsIssue.findMany({
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
    })

    return result

}
// GET SINGLE ISSUE
const getSingleGoodIssueService = async (user: TAuthUser, id: string) => {
    const result = await prisma.goodsIssue.findFirst({
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
    })

    return result

}

// GOODS ISSUE HISTORY LOG
const getGoodsIssueHistoryLogs = async (user: TAuthUser, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma.goodHistoryLog.findMany({
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

        prisma.goodHistoryLog.count({
            where: {
                good: {
                    vataId: user.vataId
                }
            },
        })
    ])
    const meta = createMetaConfig({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        data: result,
        meta
    }
}

export const GoodIssueService = {
    createGoodIssueService,
    getAllGoodIssueService,
    getSingleGoodIssueService,
    getGoodsIssueHistoryLogs
}