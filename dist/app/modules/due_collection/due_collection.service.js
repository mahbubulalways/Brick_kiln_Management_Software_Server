"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueCollectionService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const ApplicationError_1 = require("../../errors/ApplicationError");
const activity_service_1 = require("../activity/activity.service");
//  GET CUSTOMER CURRENT SEASON DUE (DONE)
const getDueOfCustomerService = async (user, seasonId, customerCode) => {
    const result = await prisma_1.prisma.customer.findFirst({
        where: {
            customerCode,
            vataId: user.vataId,
        },
        include: {
            customerDues: {
                where: {
                    seasonId,
                },
                select: {
                    dueAmount: true,
                    season: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            dueCollections: {
                where: {
                    seasonId,
                    isDeleted: false,
                },
                select: {
                    collect: true,
                },
            },
        },
    });
    if (!result) {
        throw new Error("Customer not found");
    }
    const totalDue = result.customerDues.reduce((sum, item) => sum + Number(item.dueAmount), 0);
    const totalCollect = result.dueCollections.reduce((sum, item) => sum + Number(item.collect), 0);
    const dueAmount = totalDue - totalCollect;
    const season = result.customerDues[0]?.season?.name || null;
    const { customerDues, dueCollections, ...customer } = result;
    return {
        ...customer,
        season,
        dueAmount,
    };
};
// INSERT DUE (DONE)
const collectDueService = async (user, seasonId, payload) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const findCustomerId = await tx.customer.findFirst({
            where: {
                customerCode: payload.customerId,
                vataId: user.vataId,
            },
            select: { id: true },
        });
        const result = await tx.due_Collection.create({
            data: {
                customerId: findCustomerId?.id,
                due: Number(payload.due),
                collect: Number(payload.collect),
                newDue: Number(payload.newDue),
                nextDate: payload.nextDate,
                seasonId,
            },
        });
        await tx.customer.update({
            data: { nextPaymentDate: payload.nextDate },
            where: {
                vataId_customerCode: {
                    customerCode: payload.customerId,
                    vataId: user.vataId,
                },
            },
        });
        return result;
    });
    return result;
};
// SEARCH CUSTOMER FOR DEU
const searchCustomerForDeuService = async (user, seasonId, query) => {
    const search = query.search?.trim();
    const result = await prisma_1.prisma.customer.findMany({
        where: {
            vataId: user.vataId,
            ...(search
                ? {
                    OR: [
                        {
                            customerCode: {
                                contains: search,
                                mode: "insensitive",
                            },
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
                    ],
                }
                : {}),
        },
        select: {
            id: true,
            customerCode: true,
            name: true,
            address: true,
            customerDues: {
                select: {
                    season: {
                        select: {
                            name: true,
                        },
                    },
                    dueAmount: true,
                },
            },
            dueCollections: {
                where: {
                    isDeleted: false,
                },
                select: {
                    collect: true,
                },
            },
        },
    });
    const formatData = result.map((customer) => {
        const totalDue = customer.customerDues.reduce((sum, item) => sum + Number(item.dueAmount), 0);
        const totalCollect = customer.dueCollections.reduce((sum, item) => sum + Number(item.collect), 0);
        const totalDueAmount = totalDue - totalCollect;
        return {
            id: customer.id,
            customerCode: customer.customerCode,
            name: customer.name,
            address: customer.address,
            season: customer.customerDues[0]?.season?.name || "",
            totalDue: totalDueAmount,
        };
    });
    return formatData;
};
// TODAY HAVE PAY
const todayPayDueService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
        // challans: {
        //   every: {
        //     seasonId,
        //   },
        // },
        // dueCollections: {
        //   every: {
        //     seasonId,
        //     isDeleted: false,
        //   },
        // },
        // customerDues: {
        //   every: {
        //     seasonId,
        //   },
        // },
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                customerCode: {
                    contains: search,
                    mode: "insensitive",
                },
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
                    where: {
                        seasonId,
                    },
                    select: {
                        note: true,
                        season: {
                            select: {
                                name: true,
                            },
                        },
                        items: {
                            select: {
                                quantity: true,
                                delivered: true,
                            },
                        },
                    },
                },
                customerDues: {
                    where: {
                        seasonId,
                    },
                    select: {
                        dueAmount: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                dueCollections: {
                    where: {
                        seasonId,
                        isDeleted: false,
                    },
                    select: {
                        collect: true,
                        newDue: true,
                        nextDate: true,
                        createdAt: true,
                    },
                    orderBy: {
                        nextDate: "desc",
                    },
                },
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.customer.count({ where }),
    ]);
    const data = result
        .map((customer) => {
        // সব due যোগ হবে
        const totalDue = customer.customerDues.reduce((sum, item) => sum + Number(item.dueAmount || 0), 0);
        // সব collection যোগ হবে
        const totalCollect = customer.dueCollections.reduce((sum, item) => sum + Number(item.collect || 0), 0);
        const remainingDue = Math.max(totalDue - totalCollect, 0);
        const { customerDues, dueCollections, ...customerData } = customer;
        return {
            ...customerData,
            totalDue,
            totalCollect,
            remainingDue,
        };
    })
        .filter((customer) => customer.remainingDue > 0);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        meta,
        data,
    };
};
// ALREADY PAID
const getTodaysDuePaidService = async (user, seasonId, query) => {
    const pagination = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        seasonId,
        customer: {
            vataId: user.vataId,
        },
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
                season: {
                    select: { name: true },
                },
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
// GET ALL
const getAllDueListService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        vataId: user.vataId,
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                customerCode: {
                    contains: search,
                    mode: "insensitive",
                },
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
            where.dueCollections = {
                some: {
                    createdAt: dateRange,
                },
            };
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.customer.findMany({
            where,
            include: {
                challans: {
                    where: {
                        isDeleted: false,
                    },
                    select: {
                        note: true,
                        season: {
                            select: {
                                name: true,
                            },
                        },
                        items: {
                            select: {
                                quantity: true,
                                delivered: true,
                            },
                        },
                    },
                },
                customerDues: {
                    where: {
                        seasonId,
                    },
                    select: {
                        dueAmount: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                dueCollections: {
                    where: {
                        isDeleted: false,
                        seasonId,
                    },
                    select: {
                        due: true,
                        collect: true,
                        newDue: true,
                        nextDate: true,
                        createdAt: true,
                    },
                    orderBy: {
                        nextDate: "desc",
                    },
                },
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.customer.count({
            where,
        }),
    ]);
    const formattedData = result
        .map((customer) => {
        const totalQuantity = customer.challans.reduce((sum, challan) => sum +
            challan.items.reduce((itemSum, item) => itemSum + Number(item.quantity || 0), 0), 0);
        const totalDelivered = customer.challans.reduce((sum, challan) => sum +
            challan.items.reduce((itemSum, item) => itemSum + Number(item.delivered || 0), 0), 0);
        const totalDue = customer.customerDues.reduce((sum, item) => sum + Number(item.dueAmount || 0), 0);
        const totalCollect = customer.dueCollections.reduce((sum, item) => sum + Number(item.collect || 0), 0);
        const remainingDue = Math.max(totalDue - totalCollect, 0);
        return {
            id: customer.id,
            customerCode: customer.customerCode,
            name: customer.name,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            totalDue,
            totalCollect,
            remainingDue,
            nextDate: customer?.nextPaymentDate,
            remainingDelivery: totalQuantity - totalDelivered,
            totalQuantity,
            totalDelivered,
            season: customer.challans[0]?.season.name,
            note: customer?.note,
        };
    })
        .filter((customer) => customer.remainingDue > 0);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        meta,
        data: formattedData,
    };
};
// GET SINGLE
const getSingleDueCollectionService = async (user, id) => {
    const result = await prisma_1.prisma.due_Collection.findFirst({
        where: { id, isDeleted: false, customer: { vataId: user.vataId } },
        include: {
            customer: true,
            season: {
                select: { name: true },
            },
        },
    });
    return result;
};
// UPDATE DUE (DONE)
const updateDueCollectionService = async (user, id, payload) => {
    const data = {
        due: Number(payload.due),
        collect: Number(payload.collect),
        newDue: Number(payload.newDue),
        nextDate: payload.nextDate,
    };
    const findDue = await prisma_1.prisma.due_Collection.findFirst({
        where: { id },
        select: {
            due: true,
            collect: true,
            newDue: true,
            nextDate: true,
            customer: {
                select: {
                    customerCode: true,
                },
            },
        },
    });
    if (!findDue) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "বাকি পাওয়া যায়নি।");
    }
    const { customer, ...rest } = findDue;
    // UPDATE DUE COLLECTION INFORMATIONS AND CUSTOMER NEXT PAYMENT DATE
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const update = await tx.due_Collection.update({
                data: {
                    ...data,
                    customer: {
                        update: {
                            nextPaymentDate: data.nextDate,
                        },
                    },
                    updateStatus: "APPROVED",
                },
                where: { id },
            });
            return update;
        });
        await activity_service_1.ActivityService.createActivityService({
            action: "UPDATE",
            module: "DUE",
            targetId: id,
            userId: user.userId,
            vataId: user.vataId,
            newData: data,
            oldData: rest,
            referenceNumber: `কাস্টমার আইডি ${customer?.customerCode}`,
        });
        return {
            result,
            message: "বাকি তথ্য সফলভাবে আপডেট করা হয়েছে।",
        };
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.due_Collection.update({
            data: {
                updateStatus: "PENDING",
            },
            where: {
                customer: {
                    vataId: user.vataId,
                },
                id,
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "UPDATE",
                module: "DUE",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: rest,
                newData: data,
            },
        });
    });
    return {
        result,
        message: "বাকি আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
const getSingleDueCollectionDateService = async (user, id) => {
    return await prisma_1.prisma.customer.findFirst({
        where: { customerCode: id, vataId: user.vataId },
        select: { nextPaymentDate: true, id: true },
    });
};
// UPDATE DUE COLLECTION DATE
const updateDueCollectionDateService = async (user, id, info) => {
    const due = await prisma_1.prisma.customer.findFirst({
        where: { customerCode: id, vataId: user.vataId },
        select: {
            id: true,
        },
    });
    if (!due) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "বাকি পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.customer.update({
        data: { nextPaymentDate: info.date, note: info.note },
        where: { id: due?.id, vataId: user.vataId },
    });
    return result;
};
// DELETE DUE
const deleteDueCollectionService = async (user, id) => {
    const due = await prisma_1.prisma.due_Collection.findUnique({
        where: {
            id,
            customer: {
                vataId: user.vataId,
            },
        },
        select: {
            collect: true,
            customer: {
                select: { customerCode: true },
            },
            newDue: true,
            nextDate: true,
        },
    });
    if (!due) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "এই বাকি পাওয়া যায়নি।");
    }
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.due_Collection.update({
            where: {
                id,
                customer: {
                    vataId: user.vataId,
                },
            },
            data: {
                isDeleted: true,
                deleteStatus: "APPROVED",
            },
        });
        await activity_service_1.ActivityService.createActivityService({
            action: "DELETE",
            module: "DUE",
            targetId: id,
            userId: user.userId,
            vataId: user.vataId,
            referenceNumber: `কাস্টমার আইডি ${due?.customer.customerCode} এর ${due?.collect} টাকার একটি বাকি আদায় `,
        });
        return {
            result,
            message: "বাকিটি সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    // HERE REQUEST CREATE FOR DELETE
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.due_Collection.update({
            data: {
                deleteStatus: "PENDING",
            },
            where: {
                customer: {
                    vataId: user.vataId,
                },
                id,
            },
        });
        const { customer, ...rest } = due;
        return await tx.approvalRequest.create({
            data: {
                action: "DELETE",
                module: "DUE",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: {
                    customerCode: customer.customerCode,
                    ...rest,
                },
            },
        });
    });
    return {
        result,
        message: "বাকি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
exports.DueCollectionService = {
    getDueOfCustomerService,
    collectDueService,
    todayPayDueService,
    getTodaysDuePaidService,
    getAllDueListService,
    getSingleDueCollectionService,
    updateDueCollectionService,
    updateDueCollectionDateService,
    getSingleDueCollectionDateService,
    searchCustomerForDeuService,
    deleteDueCollectionService,
};
