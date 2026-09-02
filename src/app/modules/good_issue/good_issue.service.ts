import { Request } from "express";
import { GoodsIssue, Prisma } from "../../../generated/prisma/client";
import { TAuthUser } from "../../../interface/token";
import { TGoodIssue } from "./good_issue.interface";
import { IUploadFile } from "../../../interface/multer";
import { prisma } from "../../../helpers/prisma";

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
const getGoodsIssueHistoryLogs = async (user: TAuthUser) => {
    const result = await prisma.goodHistoryLog.findMany({
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
        }
    })

    return result
}

export const GoodIssueService = {
    createGoodIssueService,
    getAllGoodIssueService,
    getSingleGoodIssueService,
    getGoodsIssueHistoryLogs
}