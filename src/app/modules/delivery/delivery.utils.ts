import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

export const getStockByClass = async (
    user: TAuthUser,
    seasonId: string,
    className: string
) => {
    const [stockBooks, challans, unloads] = await Promise.all([
        prisma.stockBook.findMany({
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

        prisma.challan.findMany({
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

        prisma.unload.findMany({
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

    const stockBookStock = stockBooks.reduce(
        (total, stock) =>
            total +
            Number(stock.stockIn || 0) -
            Number(stock.stockOut || 0),
        0
    );

    const delivered = challans
        .flatMap((challan) => challan.items)
        .reduce(
            (total, item) =>
                total + Number(item.delivered || 0),
            0
        );

    const unloadQuantity = unloads
        .flatMap((unload) => unload.items)
        .filter((item) => item.class?.className === className)
        .reduce(
            (total, item) =>
                total + Number(item.quantity || 0),
            0
        );

    return stockBookStock + unloadQuantity - delivered;
};