import { prisma } from "../../../helpers/prisma";

const getTopSellingAreasService = async () => {
    const challans = await prisma.challan.findMany({
        where: {
            isDeleted: false,
            customer: {
                isDeleted: false,
            },
        },
        select: {
            id: true,
            totalPrice: true,
            customerId: true,

            customer: {
                select: {
                    address: true,
                },
            },

            items: {
                where: {
                    isDeleted: false,
                },
                select: {
                    quantity: true,
                },
            },
        },
    });

    const areaMap = new Map<
        string,
        {
            customerIds: Set<number>;
            totalChallan: number;
            totalQuantity: number;
            totalSales: number;
        }
    >();

    for (const challan of challans) {
        const area = challan.customer.address.trim();

        const totalQuantity = challan.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const existingArea = areaMap.get(area);

        if (existingArea) {
            // Unique customer
            existingArea.customerIds.add(challan.customerId);

            // Challan count
            existingArea.totalChallan += 1;

            // Total bricks
            existingArea.totalQuantity += totalQuantity;

            // Total sales
            existingArea.totalSales += challan.totalPrice;
        } else {
            areaMap.set(area, {
                customerIds: new Set([challan.customerId]),
                totalChallan: 1,
                totalQuantity,
                totalSales: challan.totalPrice,
            });
        }
    }

    const result = Array.from(areaMap.entries())
        .map(([area, data]) => ({
            area,

            totalCustomer: data.customerIds.size,

            totalChallan: data.totalChallan,

            totalQuantity: data.totalQuantity,

            totalSales: data.totalSales,
        }))
        .sort((a, b) => b.totalSales - a.totalSales)
        .slice(0, 15)
        .map((item, index) => ({
            rank: index + 1,
            ...item,
        }));

    return result;
};

export const ReportService = {
    getTopSellingAreasService
}