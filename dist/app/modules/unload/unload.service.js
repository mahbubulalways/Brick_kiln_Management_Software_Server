"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnloadService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const createNewUnloadService = async (user, seasonId, payload) => {
    const startOfDay = new Date(payload.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(payload.date);
    endOfDay.setHours(23, 59, 59, 999);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const roundId = await tx.round.findFirst({
            where: { name: payload.round, vataId: user.vataId },
            select: { id: true }
        });
        if (!roundId?.id) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ROUND ID PAI NAI");
        }
        let unload = await tx.unload.findFirst({
            where: {
                roundId: roundId.id,
                round: {
                    vataId: user.vataId,
                    seasonId
                },
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: { id: true }
        });
        if (!unload?.id) {
            unload = await tx.unload.create({
                data: {
                    date: payload.date,
                    roundId: roundId?.id,
                }
            });
        }
        // FIND CLASS ID
        const classId = await tx.classAndRate.findFirst({
            where: { className: payload.className, vataId: user.vataId, },
            select: { id: true }
        });
        if (!classId) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "CLASS PAI NAI");
        }
        const findRoundItem = await tx.unloadItem.findFirst({
            where: { classId: classId?.id, unloadId: unload.id }
        });
        let item;
        if (findRoundItem) {
            item = await tx.unloadItem.update({
                where: {
                    id: findRoundItem.id,
                },
                data: {
                    quantity: Number(payload.quantity),
                }
            });
        }
        else {
            item = await tx.unloadItem.create({
                data: {
                    classId: classId?.id,
                    quantity: Number(payload.quantity),
                    unloadId: unload.id,
                }
            });
        }
        return item;
    });
    return result;
};
// gert
// GET ALL UNLOAD
const getAllUnloadService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        round: {
            vataId: user.vataId,
            seasonId
        }
    };
    // DATE FILTER
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                round: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    }
                }
            }
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.unload.findMany({
            where,
            include: {
                round: true,
                unloadItems: {
                    include: {
                        classType: {
                            select: {
                                className: true,
                                id: true
                            }
                        }
                    }
                }
            },
            skip,
            take: limit
        }),
        prisma_1.prisma.unload.count({ where })
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
//  GET ALL DATA NOT PAGINATE
const getAllUnloadDataNoPaginateService = async (user) => {
    const result = await prisma_1.prisma.unload.findMany({
        where: {
            isDeleted: false,
            round: { vataId: user.vataId, }
        },
        include: {
            round: true,
            unloadItems: {
                include: {
                    classType: {
                        select: {
                            className: true,
                            id: true,
                            classType: true
                        }
                    }
                }
            }
        },
    });
    return result;
};
const deleteUnloadService = async (user, id) => {
    const isExist = await prisma_1.prisma.unload.findFirst({ where: { id, round: { vataId: user.vataId, } } });
    if (!isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "আনলোডের তথ্য পাওয়া যায়নি");
    }
    const result = await prisma_1.prisma.unload.update({ where: { id, round: { vataId: user.vataId, } }, data: { isDeleted: true } });
    return result;
};
exports.UnloadService = {
    createNewUnloadService,
    getAllUnloadService,
    deleteUnloadService,
    getAllUnloadDataNoPaginateService
};
