"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodStockService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const createGoodStockService = async (req) => {
    const user = req.user;
    const file = req?.file || null;
    const body = JSON.parse(req.body.data);
    const result = await prisma_1.prisma.goodsStock.create({
        data: {
            name: body.name,
            price: Number(body.price),
            quantity: Number(body.quantity),
            shop: body.shop,
            categoryId: body.categoryId,
            image: file?.filename || null,
            warranty: body.warranty || null,
            vataId: user.vataId,
        }
    });
    return result;
};
// GET ALL MALAMAL
const getAllGoodStockService = async (user) => {
    const result = await prisma_1.prisma.goodsStock.findMany({
        where: {
            vataId: user.vataId,
        },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
            goodsIssues: {
                select: {
                    quantity: true,
                },
            },
            goodsLosses: {
                select: {
                    quantity: true,
                    type: true,
                },
            },
        },
    });
    const data = result.map((item) => {
        const totalIssue = item.goodsIssues.reduce((sum, issue) => sum + Number(issue.quantity || 0), 0);
        const totalDamage = item.goodsLosses
            .filter((loss) => loss.type === "DAMAGED")
            .reduce((sum, loss) => sum + Number(loss.quantity || 0), 0);
        const totalLost = item.goodsLosses
            .filter((loss) => loss.type === "LOST")
            .reduce((sum, loss) => sum + Number(loss.quantity || 0), 0);
        return {
            ...item,
            totalIssue,
            totalDamage,
            totalLost,
        };
    });
    return data;
};
// GET SINGLE GOOD 
const getSingleGoodStockService = async (user, id) => {
    const result = await prisma_1.prisma.goodsStock.findFirst({
        where: {
            vataId: user.vataId,
            id,
        },
        select: {
            name: true,
            id: true,
            image: true,
            quantity: true,
            price: true,
            shop: true,
            warranty: true,
            createdAt: true,
            category: {
                select: {
                    name: true,
                },
            },
            goodsIssues: {
                select: {
                    quantity: true,
                    name: true,
                    location: true,
                    image: true,
                },
            },
            goodsLosses: {
                select: {
                    quantity: true,
                },
            },
            goodHistoryLogs: {
                where: {
                    type: "RETURN",
                },
                select: {
                    date: true,
                    returnBy: true,
                    lost: true,
                    okay: true,
                    damage: true,
                    image: true,
                },
            },
        },
    });
    if (!result) {
        return null;
    }
    const issueQuantity = result.goodsIssues.reduce((sum, issue) => sum + Number(issue.quantity || 0), 0);
    const lossQuantity = result.goodsLosses.reduce((sum, loss) => sum + Number(loss.quantity || 0), 0);
    const currentStock = Number(result.quantity || 0) -
        issueQuantity -
        lossQuantity;
    return {
        ...result,
        currentStock: Math.max(currentStock, 0),
    };
};
// GET SINGLE INFO
const getSingleGoodStockInfoForUpdateService = async (user, id) => {
    const result = await prisma_1.prisma.goodsStock.findFirst({
        where: {
            vataId: user.vataId,
            id,
        },
        select: {
            name: true,
            id: true,
            image: true,
            quantity: true,
            price: true,
            shop: true,
            warranty: true,
            category: {
                select: {
                    name: true,
                    id: true
                },
            },
        },
    });
    return result;
};
// GET GOOD STOCK PRODUCT OPTIONS
const getGoodStockOptionsService = async (user) => {
    const result = await prisma_1.prisma.goodsStock.findMany({
        where: {
            vataId: user.vataId,
        },
        select: {
            name: true,
            id: true,
            quantity: true,
            goodsIssues: {
                select: {
                    quantity: true,
                },
            },
            goodsLosses: {
                select: {
                    quantity: true,
                    type: true,
                },
            },
        },
    });
    return result.map((item) => {
        const issueQuantity = item.goodsIssues.reduce((sum, issue) => sum + Number(issue.quantity || 0), 0);
        const damageQuantity = item.goodsLosses
            .filter((loss) => loss.type === "DAMAGED")
            .reduce((sum, loss) => sum + Number(loss.quantity || 0), 0);
        const lostQuantity = item.goodsLosses
            .filter((loss) => loss.type === "LOST")
            .reduce((sum, loss) => sum + Number(loss.quantity || 0), 0);
        const currentQuantity = Number(item.quantity || 0) -
            issueQuantity -
            damageQuantity -
            lostQuantity;
        return {
            id: item.id,
            name: item.name,
            currentQuantity,
        };
    });
};
// GET DEMAGE GOODS
const getDemageGoodService = async (user) => {
    const result = await prisma_1.prisma.goodsLoss.findMany({
        where: {
            good: {
                vataId: user.vataId,
            },
            type: "DAMAGED",
        },
        select: {
            id: true,
            lossAmount: true,
            quantity: true,
            good: {
                select: {
                    name: true
                }
            }
        }
    });
    return result;
};
// GET LOST GOODS
const getLostGoodService = async (user) => {
    const result = await prisma_1.prisma.goodsLoss.findMany({
        where: {
            good: {
                vataId: user.vataId,
            },
            type: "LOST",
        },
        select: {
            id: true,
            lossAmount: true,
            quantity: true,
            good: {
                select: {
                    name: true
                }
            }
        }
    });
    return result;
};
// GET SINGLE GOODS LOSSS
const getSingleGoodLossService = async (user, id) => {
    const result = await prisma_1.prisma.goodsLoss.findFirst({
        where: {
            good: {
                vataId: user.vataId
            },
            id
        },
        select: {
            id: true,
            good: {
                select: { name: true }
            },
            lossAmount: true,
            quantity: true,
            type: true
        }
    });
    return result;
};
// GET SINGLE GOODS LOSSS
const updateGoodLossService = async (user, id, payload) => {
    const quantity = Number(payload.quantity);
    const goodsLoss = await prisma_1.prisma.goodsLoss.findFirst({
        where: {
            id,
            good: {
                vataId: user.vataId,
            },
        },
        select: {
            quantity: true,
        }
    });
    if (!goodsLoss) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Goods loss পাওয়া যায়নি।");
    }
    if (quantity === Number(goodsLoss.quantity)) {
        const res = await prisma_1.prisma.goodsLoss.delete({
            where: {
                id,
            },
        });
        console.log(res);
        return res;
    }
    const result = await prisma_1.prisma.goodsLoss.update({
        where: {
            id,
        },
        data: {
            quantity,
        },
    });
    return result;
};
// DELETE GOOD
const deleteGoodStockService = async (user, id) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const issue = await tx.goodsIssue.deleteMany({ where: { goodId: id } });
        const goodLoss = await tx.goodsLoss.deleteMany({ where: { goodId: id } });
        const history = await tx.goodHistoryLog.deleteMany({ where: { goodId: id } });
        const deletGood = await tx.goodsStock.delete({ where: { id, vataId: user.vataId } });
        return deletGood;
    });
    return result;
};
// UPDATE GOOD
const updateGoodStockService = async (req) => {
    const user = req.user;
    const file = req?.file || null;
    const body = JSON.parse(req.body.data);
    const id = req.params.id;
    const result = await prisma_1.prisma.goodsStock.update({
        where: {
            vataId: user.vataId,
            id
        },
        data: {
            name: body.name,
            // price: Number(body.price),
            // quantity: Number(body.quantity),
            shop: body.shop,
            categoryId: body.categoryId,
            image: file?.filename || null,
            warranty: body.warranty || null,
        }
    });
    return result;
};
exports.GoodStockService = {
    createGoodStockService,
    getAllGoodStockService,
    getGoodStockOptionsService,
    getLostGoodService,
    getDemageGoodService,
    getSingleGoodLossService,
    updateGoodLossService,
    deleteGoodStockService,
    getSingleGoodStockService,
    getSingleGoodStockInfoForUpdateService,
    updateGoodStockService
};
