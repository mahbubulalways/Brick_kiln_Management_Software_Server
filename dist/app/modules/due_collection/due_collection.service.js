"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueCollectionService = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const getDueOfCustomerService = async (customerId) => {
    const result = await prisma_1.default.customer.findFirst({
        where: { id: customerId },
    });
    return result;
};
// INSERT DUE
const collectDueService = async (payload) => {
    const data = {
        customerId: Number(payload.customerId),
        due: Number(payload.due),
        collect: Number(payload.collect),
        newDue: Number(payload.newDue),
        season: payload.season,
        nextDate: payload.nextDate,
    };
    const result = await prisma_1.default.$transaction(async (tx) => {
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
const todayPayDueService = async (date) => {
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));
    const result = await prisma_1.default.customer.findMany({
        where: {
            nextPaymentDate: { gte: startOfDay, lte: endOfDay },
            isDeleted: false,
        },
        include: {
            challans: {
                select: {
                    note: true,
                    items: { select: { quantity: true, delivered: true } },
                },
            },
        },
    });
    return result;
};
// GET TODAYS DUE PAYMENT
const getTodaysDuePaidService = async (date) => {
    const parsedDate = new Date(date);
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));
    const result = await prisma_1.default.due_Collection.findMany({
        where: {
            createdAt: { gte: startOfDay, lte: endOfDay },
            isDeleted: false,
        },
        include: {
            customer: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
// GET ALL DUE
const getAllDueListService = async (startDate, endDate) => {
    const dateFilter = startDate && endDate
        ? {
            nextPaymentDate: {
                gte: startDate,
                lte: endDate,
            },
            isDeleted: false,
        }
        : { isDeleted: false };
    const result = await prisma_1.default.customer.findMany({
        where: dateFilter,
        include: {
            challans: {
                select: {
                    items: {
                        select: {
                            delivered: true,
                            quantity: true,
                        },
                    },
                },
            },
        },
    });
    const filtered = result.filter((c) => c.totalPaid !== c.totalPurchased);
    return filtered;
};
// GET SINGLE
const getSingleDueCollectionService = async (id) => {
    const result = await prisma_1.default.due_Collection.findFirst({
        where: { id, isDeleted: false },
        include: { customer: true },
    });
    return result;
};
const updateDueCollectionService = async (id, payload) => {
    const data = {
        customerId: Number(payload.customerId),
        due: Number(payload.due),
        collect: Number(payload.collect),
        newDue: Number(payload.newDue),
        season: payload.season,
        nextDate: payload.nextDate,
    };
    const result = await prisma_1.default.$transaction(async (tx) => {
        const getDueFirst = await tx.due_Collection.findFirst({
            where: { id },
            select: { collect: true },
        });
        const dueCalculate = payload.collect - getDueFirst?.collect;
        const update = await tx.due_Collection.update({
            data: data,
            where: { id },
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
exports.DueCollectionService = {
    getDueOfCustomerService,
    collectDueService,
    todayPayDueService,
    getTodaysDuePaidService,
    getAllDueListService,
    getSingleDueCollectionService,
    updateDueCollectionService,
};
//# sourceMappingURL=due_collection.service.js.map