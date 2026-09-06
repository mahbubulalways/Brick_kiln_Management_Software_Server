"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockByClass = void 0;
const prisma_1 = require("../../../helpers/prisma");
const getStockByClass = async (user, seasonId, className) => {
    const [stockBooks, challans, unloads] = await Promise.all([
        prisma_1.prisma.stockBook.findMany({
            where: {
                isDeleted: false,
                seasonId,
                vataId: user.vataId,
                class: className,
            },
            select: {
                stockIn: true,
                stockOut: true,
            },
        }),
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
                        class: className,
                    },
                    select: {
                        delivered: true,
                    },
                },
            },
        }),
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
    const stockBookStock = stockBooks.reduce((total, stock) => total +
        Number(stock.stockIn || 0) -
        Number(stock.stockOut || 0), 0);
    const delivered = challans
        .flatMap((challan) => challan.items)
        .reduce((total, item) => total + Number(item.delivered || 0), 0);
    const unloadQuantity = unloads
        .flatMap((unload) => unload.items)
        .filter((item) => item.class?.className === className)
        .reduce((total, item) => total + Number(item.quantity || 0), 0);
    return stockBookStock + unloadQuantity - delivered;
};
exports.getStockByClass = getStockByClass;
