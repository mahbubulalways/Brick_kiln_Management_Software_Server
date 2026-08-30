"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadInfoService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
// CREATE LOAD INFO
const createLoadInfoService = async (user, seasonId, payload) => {
    const round = payload.round;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        let roundExist = await tx.round.findFirst({ where: { name: round, vataId: user.vataId } });
        if (!roundExist) {
            roundExist = await tx.round.create({ data: { name: round, vataId: user.vataId, seasonId } });
        }
        const loadData = {
            roundId: roundExist.id,
            date: payload.date,
            quantity: Number(payload.quantity),
            loadType: payload.loadType,
            classType: payload.classType || null
        };
        const load = await tx.loadInfo.create({
            data: loadData,
        });
        return load;
    });
    return result;
};
// GET ALL LOAD INFO
const getAllLoadInfoService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        round: { vataId: user.vataId, seasonId }
    };
    // DATE FILTER
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    // SEARCH
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                loadType: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                round: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.loadInfo.findMany({
            where,
            skip,
            take: limit,
            include: {
                round: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.loadInfo.count({
            where,
        }),
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
// GET SINGLE LOAD INFO
const getSingleLoadInfoService = async (user, id) => {
    return await prisma_1.prisma.loadInfo.findFirst({
        where: {
            id,
            isDeleted: false,
            round: {
                vataId: user.vataId
            }
        },
        include: {
            round: true,
        },
    });
};
// UPDATE LOAD INFO
const updateLoadInfoService = async (user, seasonId, id, payload) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // Round name
        const roundName = `${payload.round}`;
        // Check round exists
        let roundExist = await tx.round.findFirst({
            where: {
                vataId: user.vataId,
                name: roundName,
            },
        });
        // Create round if not exists
        if (!roundExist) {
            roundExist = await tx.round.create({
                data: {
                    vataId: user.vataId,
                    name: roundName,
                    seasonId
                },
            });
        }
        // Update load info
        const load = await tx.loadInfo.update({
            where: {
                id,
                round: {
                    vataId: user.vataId
                }
            },
            data: {
                roundId: roundExist.id,
                date: payload.date,
                quantity: Number(payload.quantity),
                loadType: payload.loadType,
                classType: payload.classType || null,
            },
            include: {
                round: true,
            },
        });
        return load;
    });
    return result;
};
// DELETE LOAD INFO
const deleteLoadInfoService = async (user, id) => {
    return await prisma_1.prisma.loadInfo.update({
        data: {
            isDeleted: true,
        },
        where: {
            id,
            round: {
                vataId: user.vataId
            }
        },
    });
};
exports.LoadInfoService = {
    createLoadInfoService,
    getAllLoadInfoService,
    getSingleLoadInfoService,
    updateLoadInfoService,
    deleteLoadInfoService,
};
