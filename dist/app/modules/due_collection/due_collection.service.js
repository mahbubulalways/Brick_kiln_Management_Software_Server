"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueCollectionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const ApplicationError_1 = require("../../errors/ApplicationError");
const getDueOfCustomerService = async (user, customerCode) => {
    const result = await prisma_1.prisma.customer.findFirst({
        where: { customerCode: customerCode, vataId: user.vataId },
    });
    return result;
};
// INSERT DUE
const collectDueService = async (user, payload) => {
    const findCustomerId = await prisma_1.prisma.customer.findFirst({
        where: {
            customerCode: payload.customerId, vataId: user.vataId,
        },
    });
    const customer = await prisma_1.prisma.customer.findMany({ where: { vataId: user.vataId } });
    const data = {
        customerId: findCustomerId?.id,
        due: Number(payload.due),
        collect: Number(payload.collect),
        newDue: Number(payload.newDue),
        nextDate: payload.nextDate,
    };
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const result = await tx.due_Collection.create({
            data: data,
        });
        await tx.customer.update({
            data: {
                totalPaid: { increment: data?.collect },
                nextPaymentDate: data.nextDate,
            },
            where: {
                id: data.customerId,
            },
        });
        return result;
    });
    return result;
};
// TODAY HAVE PAY
const todayPayDueService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                customerCode: {
                    contains: search,
                    mode: "insensitive",
                }
            },
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                address: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.nextPaymentDate = dateRange;
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.customer.findMany({
            where,
            include: {
                challans: {
                    select: {
                        note: true,
                        items: { select: { quantity: true, delivered: true } },
                    },
                },
            },
            orderBy: { nextPaymentDate: "asc" },
            skip, take: limit
        }),
        prisma_1.prisma.customer.count({ where })
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
const getTodaysDuePaidService = async (user, query) => {
    const pagination = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        customer: {
            vataId: user.vataId
        }
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.createdAt = dateRange;
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.due_Collection.findMany({
            where,
            include: {
                customer: true,
            },
            orderBy: {
                createdAt: "desc",
            },
            skip: pagination.skip,
            take: pagination.limit,
        }),
        prisma_1.prisma.due_Collection.count({
            where,
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: pagination.limit,
        page: pagination.page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
// GET ALL DUE
const getAllDueListService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        vataId: user.vataId
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                customerCode: {
                    contains: search,
                    mode: "insensitive",
                }
            },
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                address: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.nextPaymentDate = dateRange;
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.customer.findMany({
            where,
            include: {
                challans: {
                    include: { items: true }
                }
            },
            skip, take: limit
        }),
        prisma_1.prisma.customer.findMany({
            where,
            include: {
                challans: {
                    include: { items: true }
                }
            },
        }),
    ]);
    const customersWithRemaining = result.map((customer) => {
        const { challans, ...customerData } = customer;
        let totalQuantity = 0;
        let totalDelivered = 0;
        challans.forEach((challan) => {
            challan.items.forEach((item) => {
                totalQuantity += item.quantity ?? 0;
                totalDelivered += item.delivered ?? 0;
            });
        });
        return {
            ...customerData,
            remainingDelivery: totalQuantity - totalDelivered,
        };
    });
    const totalLength = total.map((customer) => {
        const { challans, ...customerData } = customer;
        let totalQuantity = 0;
        let totalDelivered = 0;
        challans.forEach((challan) => {
            challan.items.forEach((item) => {
                totalQuantity += item.quantity ?? 0;
                totalDelivered += item.delivered ?? 0;
            });
        });
        return {
            ...customerData,
            remainingDelivery: totalQuantity - totalDelivered,
        };
    }).length;
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: totalLength,
    });
    return {
        meta,
        data: customersWithRemaining,
    };
};
// GET SINGLE
const getSingleDueCollectionService = async (user, id) => {
    const result = await prisma_1.prisma.due_Collection.findFirst({
        where: { id, isDeleted: false, customer: { vataId: user.vataId } },
        include: { customer: true },
    });
    return result;
};
const updateDueCollectionService = async (user, id, payload) => {
    const findCustomerId = await prisma_1.prisma.customer.findFirst({
        where: {
            customerCode: payload.customerId, vataId: user.vataId,
        }, select: { id: true }
    });
    const data = {
        customerId: findCustomerId?.id,
        due: Number(payload.due),
        collect: Number(payload.collect),
        newDue: Number(payload.newDue),
        nextDate: payload.nextDate,
    };
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const getDueFirst = await tx.due_Collection.findFirst({
            where: { id },
            select: { collect: true },
        });
        const dueCalculate = payload.collect - getDueFirst?.collect;
        const update = await tx.due_Collection.update({
            data: data,
            where: { id },
        });
        await tx.customer.update({
            where: { id: data.customerId },
            data: { nextPaymentDate: payload.nextDate }
        });
        // NEED TO UPDATE CUSTOMER DUE
        await tx.customer.update({
            data: {
                totalPaid: { increment: dueCalculate },
            },
            where: {
                id: data.customerId,
            },
        });
        return update;
    });
    return result;
};
const getSingleDueCollectionDateService = async (user, id) => {
    return await prisma_1.prisma.customer.findFirst({
        where: { customerCode: id, vataId: user.vataId }, select: { nextPaymentDate: true, id: true }
    });
};
// UPDATE DUE COLLECTION DATE 
const upDateDueCollectionDateService = async (user, id, info) => {
    const due = await prisma_1.prisma.customer.findFirst({
        where: { customerCode: id, vataId: user.vataId },
        select: {
            id: true,
        }
    });
    if (!due) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "বাকি পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.customer.update({
        data: { nextPaymentDate: info.date, note: info.note, },
        where: { id: due?.id, vataId: user.vataId }
    });
    return result;
};
exports.DueCollectionService = {
    getDueOfCustomerService,
    collectDueService,
    todayPayDueService,
    getTodaysDuePaidService,
    getAllDueListService,
    getSingleDueCollectionService,
    updateDueCollectionService,
    upDateDueCollectionDateService,
    getSingleDueCollectionDateService
};
