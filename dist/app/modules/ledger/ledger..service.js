"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
// GET LEDGER COUNT
const getLedgerCountService = async (user) => {
    const res = await prisma_1.prisma.ledger.count({ where: { vataId: user?.vataId } });
    return res + 1;
};
// CREATE A LEDGER
const createLedgerService = async (user, seasonId, data) => {
    const isExist = await prisma_1.prisma.ledger.findFirst({
        where: {
            name: data.name,
            vataId: user.vataId,
            isDeleted: false,
            seasonId,
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই নামে একটি লেজার বা লেজার গ্রুপ ইতোমধ্যে রয়েছে।");
    }
    const result = await prisma_1.prisma.ledger.create({
        data: {
            ...data,
            serial: Number(data.serial),
            quantity: Number(data.quantity || 0),
            rate: Number(data.rate || 0),
            vataId: user.vataId,
            seasonId,
        },
    });
    return result;
};
// GET GROUP OPTION
const getLedgerOptionService = async (user, seasonId) => {
    const res = await prisma_1.prisma.ledger.findMany({
        where: {
            parentId: null,
            isDeleted: false,
            vataId: user.vataId,
            seasonId,
        },
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return res;
};
// GET ALL LEDGER WITH CHILDREN
const getAllLedgerWithChildrenService = async (user, seasonId) => {
    const res = await prisma_1.prisma.ledger.findMany({
        where: {
            parentId: null,
            isDeleted: false,
            vataId: user.vataId,
            seasonId,
        },
        select: {
            id: true,
            name: true,
            children: { select: { name: true, id: true } },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return res;
};
// GET ALL LEDGERS WITH PAGINATION
const getAllLedgerWithChildrenPaginationService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
        seasonId,
        // parentId: null,
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.ledger.findMany({
            where,
            select: {
                id: true,
                name: true,
                parentId: true,
                rate: true,
                quantity: true,
                serial: true,
                parent: {
                    select: {
                        name: true,
                    },
                },
                children: {
                    select: {
                        name: true,
                        id: true,
                        rate: true,
                        quantity: true,
                        serial: true,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: "asc",
            },
        }),
        prisma_1.prisma.ledger.count({ where }),
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
// GET ALL LEDGER WITH TK
const getAllLedgerWithAmountService = async (user, seasonId) => {
    const result = await prisma_1.prisma.ledger.findMany({
        where: {
            isDeleted: false,
            seasonId,
            vataId: user.vataId,
        },
        include: {
            payments: {
                where: {
                    isDeleted: false,
                    vataId: user.vataId,
                },
                select: {
                    payment: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    // প্রতিটি ledger-এর নিজের payment total
    const ledgerMap = new Map();
    result.forEach((ledger) => {
        const ownTotal = ledger.payments.reduce((sum, payment) => sum + Number(payment.payment || 0), 0);
        ledgerMap.set(ledger.id, {
            id: ledger.id,
            name: ledger.name,
            parentId: ledger.parentId,
            total: ownTotal,
            children: [],
        });
    });
    // Parent -> Children
    result.forEach((ledger) => {
        if (ledger.parentId !== null) {
            const parent = ledgerMap.get(ledger.parentId);
            const child = ledgerMap.get(ledger.id);
            if (parent && child && child.total > 0) {
                parent.children.push({
                    id: child.id,
                    name: child.name,
                    total: child.total,
                });
            }
        }
    });
    // Final response
    const finalResult = [];
    for (const ledger of result) {
        if (ledger.parentId !== null)
            continue;
        const parent = ledgerMap.get(ledger.id);
        const childrenTotal = parent.children.reduce((sum, child) => sum + child.total, 0);
        const total = parent.total + childrenTotal;
        // Parent এবং তার children—সবগুলোর total 0 হলে বাদ
        if (total <= 0)
            continue;
        if (parent.children.length > 0) {
            finalResult.push({
                id: parent.id,
                name: parent.name,
                total,
                children: parent.children,
            });
        }
        else {
            finalResult.push({
                id: parent.id,
                name: parent.name,
                total,
            });
        }
    }
    return finalResult;
};
// GET DETAILS
const getDetailsLedgerService = async (user, seasonId, id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
    };
    // Create start and end of day boundaries
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.paymentDate = dateRange;
        }
    }
    const ledger = await prisma_1.prisma.ledger.findUnique({
        where: { id, vataId: user.vataId, seasonId },
        select: { name: true, id: true, parentId: true },
    });
    if (ledger?.name) {
        where.ledger = {
            name: ledger.name,
        };
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "");
    }
    const [payment, total] = await Promise.all([
        prisma_1.prisma.payment.findMany({ where }),
        prisma_1.prisma.payment.count({ where }),
    ]);
    const format = {
        ledger: ledger?.name,
        id: ledger?.id,
        data: payment,
    };
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: format,
    };
};
// const GET SINGLE
const getSingleLedgerService = async (user, id) => {
    const result = await prisma_1.prisma.ledger.findFirst({
        where: { id, vataId: user.vataId },
        select: {
            serial: true,
            name: true,
            parentId: true,
            rate: true,
            quantity: true,
        },
    });
    return result;
};
/// UPDATE KHOTIYAN
const updateLedgerService = async (user, id, data) => {
    const isExist = await prisma_1.prisma.ledger.findUnique({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "এই খতিয়ানটি পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.ledger.update({
        where: {
            id,
            vataId: user.vataId,
        },
        data: {
            quantity: Number(data.quantity),
            rate: Number(data.rate),
        },
    });
    return result;
};
// DELETE KHOTIYAN
const deleteLedgerService = async (user, id) => {
    const isExist = await prisma_1.prisma.ledger.findUnique({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "এই খতিয়ানটি পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.ledger.update({
        where: {
            id,
            vataId: user.vataId,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
};
exports.LedgerService = {
    getLedgerCountService,
    createLedgerService,
    getLedgerOptionService,
    getAllLedgerWithChildrenService,
    getAllLedgerWithAmountService,
    getDetailsLedgerService,
    getAllLedgerWithChildrenPaginationService,
    getSingleLedgerService,
    updateLedgerService,
    deleteLedgerService,
};
