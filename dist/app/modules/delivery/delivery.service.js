"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryService = void 0;
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const getNextDeliveryNo = async () => {
    const result = await prisma_1.prisma.delivery.findFirst({
        orderBy: {
            deliveryNo: "desc",
        },
        select: {
            deliveryNo: true,
        },
    });
    return result ? result.deliveryNo + 1 : 1;
};
const getDeliveryThatGoTodayService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { isDeleted: false };
    // Create start and end of day boundaries
    if (query.search?.trim()) {
        const search = query.search.trim();
        const isNumber = !isNaN(Number(search));
        where.OR = [
            ...(isNumber
                ? [
                    {
                        id: Number(search),
                    },
                ]
                : []),
            {
                customer: {
                    is: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            },
            {
                customer: {
                    is: {
                        address: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            },
        ];
    }
    const dateRange = query.date
        ? (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date)
        : undefined;
    if (query.date) {
        if (dateRange) {
            where.items = {
                some: {
                    deliveryDate: dateRange,
                },
            };
        }
    }
    // Create start and end of day boundaries
    // Fetch deliveries within the day
    const [result, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.challan.findMany({
            where,
            select: {
                id: true,
                customer: true,
                items: {
                    where: dateRange
                        ? {
                            deliveryDate: dateRange,
                        }
                        : undefined,
                },
            },
            orderBy: {
                deliveryDate: "asc",
            }, skip,
            take: limit
        }),
        prisma_1.prisma.challan.count({ where })
    ]);
    // Filter out challans with no items
    const filteredResult = result.filter((challan) => challan.items.length > 0);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: filteredResult.length > 0 ? filteredResult : [],
    };
};
// CREATE DELIVERY
const createDeliveryService = async (payload) => {
    const isDeliveryNoExist = await prisma_1.prisma.delivery.findFirst({
        where: {
            deliveryNo: Number(payload?.deliveryNo),
        },
    });
    if (isDeliveryNoExist?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ডেলিভারি নম্বর ইতিমধ্যে আছে");
    }
    const data = {
        deliveryDate: payload.deliveryDate,
        deliveryNo: Number(payload.deliveryNo),
        nextDeliveryDate: payload.nextDeliveryDate,
        quantity: Number(payload.items.quantity),
        deliveryReceived: Number(payload.items.todaysDelivery),
        class: payload.items.class,
        deliveryRemaining: Number(payload.items.remainingDelivery),
        driverName: payload.driverName,
        driverPhoneNumber: payload.driverMobileNumber,
        carNo: payload.carNumber,
        invoiceId: Number(payload.invoiceId),
        carRent: Number(payload.carRent),
    };
    // if (payload?.savingType == "saveOnly") {
    //   if (!isDeliveryNoExist?.id) {
    //     throw new AppError(
    //       StatusCodes.CONFLICT,
    //       "নতুন কোন ডেলিভারি ক্রিয়েট করা হয়নি"
    //     );
    //   }
    //   const result = await prisma.$transaction(
    //     async (tx: Prisma.TransactionClient) => {
    //       const calculate =
    //         isDeliveryNoExist.deliveryReceived - data.deliveryReceived;
    //       const createDelivery = await tx.delivery.update({
    //         data: {
    //           deliveryDate: data.deliveryDate,
    //           class: data.class,
    //           deliveryReceived: data.deliveryReceived,
    //           deliveryRemaining: data.deliveryRemaining,
    //           nextDeliveryDate: data.nextDeliveryDate,
    //           quantity: data.quantity,
    //           carNo: data.carNo,
    //           driverName: data.driverName,
    //           driverPhoneNumber: data.driverPhoneNumber,
    //           invoiceId: Number(payload.invoiceId),
    //         },
    //         where: {
    //           deliveryNo: data?.deliveryNo,
    //         },
    //       });
    //       const updateItem = await tx.challanItem.update({
    //         data: {
    //           delivered: {
    //             increment: calculate,
    //           },
    //         },
    //         where: {
    //           id: Number(payload?.itemId),
    //         },
    //       });
    //       console.log(updateItem);
    //       return createDelivery;
    //     }
    //   );
    // }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const createDelivery = await tx.delivery.create({
            data: {
                deliveryDate: data.deliveryDate,
                class: data.class,
                deliveryNo: data.deliveryNo,
                deliveryReceived: data.deliveryReceived,
                deliveryRemaining: data.deliveryRemaining,
                nextDeliveryDate: data.nextDeliveryDate,
                quantity: data.quantity,
                carNo: data.carNo,
                driverName: data.driverName,
                driverPhoneNumber: data.driverPhoneNumber,
                invoiceId: Number(payload.invoiceId),
                carRent: data.carRent,
            },
        });
        if (data?.deliveryRemaining) {
            const update = await tx.challanItem.update({
                data: {
                    deliveryDate: data.nextDeliveryDate,
                },
                where: {
                    id: payload.itemId,
                },
            });
            console.log(update);
        }
        const updateItem = await tx.challanItem.update({
            data: {
                delivered: {
                    increment: data?.deliveryReceived,
                },
            },
            where: {
                id: Number(payload?.itemId),
            },
        });
        return createDelivery;
    });
    return result;
};
//
const getTodaysDeliveryThatDone = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { isDeleted: false };
    // Create start and end of day boundaries
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.deliveryDate = dateRange;
        }
    }
    const [result, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.delivery.findMany({
            where,
            include: {
                invoice: {
                    select: {
                        customer: true,
                    },
                },
            }, skip, take: limit, orderBy: { createdAt: "desc" }
        }),
        prisma_1.prisma.delivery.count({ where })
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
// GET ALL DELIVERY
const getAllDeliveryListService = async (query) => {
    console.log(query);
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
    };
    // Date range
    const dateRange = query.date
        ? (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date)
        : undefined;
    // Filter challan by item delivery date
    if (dateRange) {
        where.items = {
            some: {
                deliveryDate: dateRange,
            },
        };
    }
    // Search
    if (query.search?.trim()) {
        const search = query.search.trim();
        const isNumber = !isNaN(Number(search));
        where.OR = [
            ...(isNumber
                ? [
                    {
                        id: Number(search),
                    },
                ]
                : []),
            {
                customer: {
                    is: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            },
            {
                customer: {
                    is: {
                        address: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            },
        ];
    }
    const [result, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.challan.findMany({
            where,
            select: {
                id: true,
                customer: true,
                items: {
                    where: dateRange
                        ? {
                            deliveryDate: dateRange,
                        }
                        : undefined,
                },
            },
            orderBy: {
                deliveryDate: "asc",
            }, skip,
            take: limit
        }),
        prisma_1.prisma.challan.findMany({
            where,
            select: {
                items: {
                    where: dateRange
                        ? {
                            deliveryDate: dateRange,
                        }
                        : undefined,
                },
            },
        }),
    ]);
    const filteredResult = result
        .map((challan) => ({
        ...challan,
        items: challan.items.filter((item) => item.quantity > item.delivered),
    }))
        .filter((challan) => challan.items.length > 0);
    const totalCount = total.map((challan) => ({
        ...challan,
        items: challan.items.filter((item) => item.quantity > item.delivered),
    }))
        .filter((challan) => challan.items.length > 0).length;
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: totalCount,
    });
    return {
        meta,
        data: filteredResult,
    };
};
const getSingleDeliveryService = async (id) => {
    const result = await prisma_1.prisma.delivery.findFirst({ where: { id } });
    return result;
};
exports.DeliveryService = {
    getNextDeliveryNo,
    getDeliveryThatGoTodayService,
    createDeliveryService,
    getTodaysDeliveryThatDone,
    getAllDeliveryListService,
    getSingleDeliveryService,
};
