"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
// CREATE CASH
const createCashService = async (user, seasonId, payload) => {
    const result = prisma_1.prisma.cash.create({
        data: {
            ...payload,
            vataId: user.vataId,
            seasonId
        }
    });
    return result;
};
// GET ALL CASH 
const getAllCashService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { isDeleted: false, vataId: user.vataId, seasonId };
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
                    mode: "insensitive"
                }
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.cash.findMany({ where, skip, take: limit }),
        prisma_1.prisma.cash.count({ where })
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
    const where = { isDeleted: false, vataId: user.vataId, seasonId };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.createdAt = dateRange;
        }
    }
    const result = await prisma_1.prisma.cash.findMany({
        where, select: {
            amount: true, type: true, id: true, source: true
        }
    });
    return result;
};
// GET SINGLE CASH
const getSingleCashService = async (user, id) => {
    return await prisma_1.prisma.cash.findFirst({ where: { id, vataId: user.vataId } });
};
// UPDATE CASH
const updateCashService = async (user, id, payload) => {
    return prisma_1.prisma.cash.update({ data: payload, where: { id, vataId: user.vataId } });
};
// DELETE CASH
const deleteCashService = async (user, id) => {
    return prisma_1.prisma.cash.update({ data: { isDeleted: true }, where: { id, vataId: user.vataId } });
};
exports.CashService = {
    createCashService,
    getAllCashService,
    getSingleCashService,
    updateCashService,
    deleteCashService,
    getCashReportService
};
