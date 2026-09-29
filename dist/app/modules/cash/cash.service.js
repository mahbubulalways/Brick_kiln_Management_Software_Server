"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const ApplicationError_1 = require("../../errors/ApplicationError");
const activity_service_1 = require("../activity/activity.service");
// CREATE CASH
const createCashService = async (user, seasonId, payload) => {
    const result = prisma_1.prisma.cash.create({
        data: {
            ...payload,
            vataId: user.vataId,
            seasonId,
        },
    });
    return result;
};
// GET ALL CASH
const getAllCashService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        vataId: user.vataId,
        seasonId,
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.createdAt = dateRange;
        }
    }
    if (query.search?.trim()) {
        const search = query.search.trim();
        // const isNumber = !isNaN(Number(search));
        where.OR = [
            {
                source: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.cash.findMany({ where, skip, take: limit }),
        prisma_1.prisma.cash.count({ where }),
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
const getCashReportService = async (user, seasonId, query) => {
    const where = {
        isDeleted: false,
        vataId: user.vataId,
        seasonId,
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.createdAt = dateRange;
        }
    }
    const result = await prisma_1.prisma.cash.findMany({
        where,
        select: {
            amount: true,
            type: true,
            id: true,
            source: true,
        },
    });
    return result;
};
// GET SINGLE CASH
const getSingleCashService = async (user, id) => {
    return await prisma_1.prisma.cash.findFirst({ where: { id, vataId: user.vataId } });
};
// UPDATE CASH
const updateCashService = async (user, id, payload) => {
    const cash = await prisma_1.prisma.cash.findUnique({
        where: {
            id,
            vataId: user.vataId,
        },
        select: {
            amount: true,
            source: true,
            type: true,
            description: true,
        },
    });
    if (!cash) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "এই ক্যাশটি পাওয়া যায়নি।");
    }
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.cash.update({
            data: {
                ...payload,
                updateStatus: "APPROVED",
            },
            where: { id, vataId: user.vataId },
        });
        await activity_service_1.ActivityService.createActivityService({
            action: "UPDATE",
            module: "CASH",
            targetId: id,
            userId: user.userId,
            vataId: user.vataId,
            newData: payload,
            oldData: cash,
        });
        return {
            result,
            message: "ক্যাশের তথ্য সফলভাবে আপডেট করা হয়েছে।",
        };
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.cash.update({
            data: {
                updateStatus: "PENDING",
            },
            where: {
                vataId: user.vataId,
                id,
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "UPDATE",
                module: "CASH",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                newData: payload,
                oldData: cash,
            },
        });
    });
    return {
        result,
        message: "খতিয়ান আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
// DELETE CASH
const deleteCashService = async (user, id) => {
    const cash = await prisma_1.prisma.cash.findUnique({
        where: {
            id,
            vataId: user.vataId,
        },
        select: {
            amount: true,
            source: true,
            type: true,
            description: true,
        },
    });
    if (!cash) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "এই ক্যাশটি পাওয়া যায়নি।");
    }
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.cash.update({
            data: { isDeleted: true, deleteStatus: "APPROVED" },
            where: { id, vataId: user.vataId },
        });
        const cashType = cash?.type == "INCOME" ? "ক্যাশ ইন" : "ক্যাশ আউট";
        await activity_service_1.ActivityService.createActivityService({
            action: "DELETE",
            module: "CASH",
            targetId: id,
            userId: user.userId,
            vataId: user.vataId,
            referenceNumber: `${cash?.source} এর ${cash.amount} টাকা ${cashType}`,
        });
        return {
            result,
            message: "ক্যাশটি সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    // HERE REQUEST CREATE FOR DELETE
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.cash.update({
            data: {
                deleteStatus: "PENDING",
            },
            where: {
                vataId: user.vataId,
                id,
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "DELETE",
                module: "CASH",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: cash,
            },
        });
    });
    return {
        result,
        message: "ক্যাশটি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
exports.CashService = {
    createCashService,
    getAllCashService,
    getSingleCashService,
    updateCashService,
    deleteCashService,
    getCashReportService,
};
