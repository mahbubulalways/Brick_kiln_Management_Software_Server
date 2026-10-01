"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockBookService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
const activity_service_1 = require("../activity/activity.service");
// CREATE STOCK BOOK SERVICE
const createStockBookService = async (user, seasonId, payload) => {
    payload.createdById = user.userId;
    payload.seasonId = seasonId;
    payload.vataId = user.vataId;
    const result = await prisma_1.prisma.stockBook.create({ data: payload });
    return result;
};
// GET ALL STOCK
const getAllStockService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.stockBook.findMany({
            where: { isDeleted: false, seasonId, vataId: user.vataId },
            include: {
                createdBy: {
                    select: {
                        name: true,
                    },
                },
            },
            take: limit,
            skip,
        }),
        prisma_1.prisma.stockBook.count({
            where: { isDeleted: false, seasonId, vataId: user.vataId },
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
// DELETE
const deleteStockService = async (user, id) => {
    const existingStock = await prisma_1.prisma.stockBook.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!existingStock) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "স্টকের তথ্য পাওয়া যায়নি।");
    }
    const oldData = {
        name: existingStock.class,
        stockIn: existingStock.stockIn,
        stockOut: existingStock.stockOut,
    };
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            await tx.stockBook.delete({
                where: { id },
            });
            return await activity_service_1.ActivityService.createActivityService({
                action: "DELETE",
                module: "STOCK",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData,
                referenceNumber: `${existingStock.class} | ইন: ${existingStock.stockIn} | আউট: ${existingStock.stockOut}`,
            });
        });
        return {
            result,
            message: "স্টকের তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    const result = await prisma_1.prisma.stockBook.update({
        where: { id },
        data: {
            deleteStatus: "PENDING",
        },
    });
    await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "DELETE",
            module: "STOCK",
            targetId: id,
            requestedById: user.userId,
            vataId: user.vataId,
            status: "PENDING",
            oldData,
        },
    });
    return {
        result,
        message: "স্টকের তথ্য মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
// GET MAIN STOCK
// const getMainStockInformation = async (user: TAuthUser, seasonId: string) => {
//   const allClass = await prisma.classAndRate.findMany({
//     where: { isDeleted: false, vataId: user.vataId }, select: { className: true, rate:true}
//   })
//   const allStock = await prisma.stockBook.findMany({
//     where: {
//       isDeleted: false, seasonId, vataId: user.vataId
//     }, select: {
//       stockIn: true,
//       class: true,
//       stockOut: true
//     }
//   })
//   const challans = await prisma.challan.findMany({
//     where: {
//       seasonId,
//       vataId: user.vataId,
//       isDeleted: false
//     },
//     select: {
//       items: {
//         where: {
//           isDeleted: false
//         },
//         select: {
//           quantity: true,
//           delivered: true
//         }
//       }
//     }
//   })
// }
const getMainStockInformation = async (user, seasonId) => {
    const [allClass, allStock, challans, unloads] = await Promise.all([
        // =========================
        // ALL CLASS
        // =========================
        prisma_1.prisma.classAndRate.findMany({
            where: {
                isDeleted: false,
                vataId: user.vataId,
            },
            select: {
                className: true,
                rate: true,
            },
        }),
        // =========================
        // STOCK BOOK
        // =========================
        prisma_1.prisma.stockBook.findMany({
            where: {
                isDeleted: false,
                seasonId,
                vataId: user.vataId,
            },
            select: {
                stockIn: true,
                stockOut: true,
                class: true,
            },
        }),
        // =========================
        // CHALLAN
        // =========================
        prisma_1.prisma.challan.findMany({
            where: {
                seasonId,
                vataId: user.vataId,
                isDeleted: false,
            },
            select: {
                items: {
                    where: {
                        isDeleted: false,
                    },
                    select: {
                        class: true,
                        quantity: true,
                        delivered: true,
                    },
                },
            },
        }),
        // =========================
        // UNLOAD
        // =========================
        prisma_1.prisma.unload.findMany({
            where: {
                round: {
                    vataId: user.vataId,
                    seasonId,
                },
                isDeleted: false,
            },
            select: {
                items: {
                    select: {
                        quantity: true,
                        class: {
                            select: {
                                className: true,
                            },
                        },
                    },
                },
            },
        }),
    ]);
    // ==========================================
    // STOCK BOOK MAP
    // Stock In - Stock Out
    // ==========================================
    const stockMap = allStock.reduce((acc, stock) => {
        const className = stock.class;
        if (!acc[className]) {
            acc[className] = {
                stockIn: 0,
                stockOut: 0,
            };
        }
        acc[className].stockIn += Number(stock.stockIn || 0);
        acc[className].stockOut += Number(stock.stockOut || 0);
        return acc;
    }, {});
    // ==========================================
    // DELIVERED MAP
    // Class অনুযায়ী কত ইট delivered হয়েছে
    // ==========================================
    const deliveredMap = challans
        .flatMap((challan) => challan.items)
        .reduce((acc, item) => {
        const className = item.class;
        acc[className] = (acc[className] || 0) + Number(item.delivered || 0);
        return acc;
    }, {});
    // ==========================================
    // DELIVERY PENDING MAP
    // Quantity - Delivered
    // ==========================================
    const deliveryPendingMap = challans
        .flatMap((challan) => challan.items)
        .reduce((acc, item) => {
        const className = item.class;
        const pending = Number(item.quantity || 0) - Number(item.delivered || 0);
        acc[className] = (acc[className] || 0) + Math.max(pending, 0);
        return acc;
    }, {});
    // ==========================================
    // UNLOAD MAP
    // ==========================================
    const unloadMap = unloads
        .flatMap((unload) => unload.items)
        .reduce((acc, item) => {
        const className = item?.class?.className;
        if (!className) {
            return acc;
        }
        acc[className] = (acc[className] || 0) + Number(item.quantity || 0);
        return acc;
    }, {});
    // ==========================================
    // FINAL DATA
    // ==========================================
    const data = allClass.map((classInfo) => {
        const className = classInfo.className;
        // Stock Book
        const stock = stockMap[className];
        const stockBookStock = (stock?.stockIn || 0) - (stock?.stockOut || 0);
        // Unload
        const unloadQuantity = unloadMap[className] || 0;
        // ======================================
        // DELIVERED
        // Actually delivered bricks
        // ======================================
        const delivered = deliveredMap[className] || 0;
        // ======================================
        // TOTAL STOCK
        // Stock Book + Unload
        // ======================================
        const totalStock = stockBookStock + unloadQuantity;
        // ======================================
        // DELIVERY PENDING
        // Challan Quantity - Delivered
        // ======================================
        const deliveryPending = deliveryPendingMap[className] || 0;
        // ======================================
        // MAIN / CURRENT STOCK
        // Total Stock - Delivered
        // ======================================
        const mainStock = totalStock - delivered;
        // ======================================
        // RATE
        // ======================================
        const rate = Number(classInfo.rate || 0);
        // ======================================
        // STOCK VALUE
        // ======================================
        const stockValue = mainStock * rate;
        return {
            className,
            rate,
            totalStock,
            delivered,
            deliveryPending,
            mainStock,
            stockValue,
        };
    });
    // ==========================================
    // TOTAL
    // ==========================================
    const total = data.reduce((acc, item) => ({
        totalStock: acc.totalStock + item.totalStock,
        delivered: acc.delivered + item.delivered,
        deliveryPending: acc.deliveryPending + item.deliveryPending,
        mainStock: acc.mainStock + item.mainStock,
        stockValue: acc.stockValue + item.stockValue,
    }), {
        totalStock: 0,
        delivered: 0,
        deliveryPending: 0,
        mainStock: 0,
        stockValue: 0,
    });
    return {
        data,
        total,
    };
};
exports.StockBookService = {
    createStockBookService,
    getAllStockService,
    deleteStockService,
    getMainStockInformation,
};
