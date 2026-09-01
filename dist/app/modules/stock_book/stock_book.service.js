"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockBookService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
// CREATE STOCK BOOK SERVICE
const createStockBookService = async (user, seasonId, payload) => {
    payload.createdById = user.userId;
    payload.seasonId = seasonId;
    payload.vataId = user.vataId;
    const result = await prisma_1.prisma.stockBook.create({ data: payload });
    return result;
};
// GET ALL STOCK
const getAllStockService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.stockBook.findMany({
            where: { isDeleted: false, seasonId, vataId: user.vataId },
            include: {
                createdBy: {
                    select: {
                        name: true,
                    }
                }
            },
            take: limit,
            skip
        }),
        prisma_1.prisma.stockBook.count({ where: { isDeleted: false, seasonId, vataId: user.vataId } })
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
// DELETE
const deleteStockService = async (id) => {
    return await prisma_1.prisma.stockBook.delete({ where: { id } });
};
exports.StockBookService = {
    createStockBookService,
    getAllStockService,
    deleteStockService
};
