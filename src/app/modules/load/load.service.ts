import { LoadInfo, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { TLoadInfo } from "./load.interface";

// CREATE LOAD INFO
const createLoadInfoService = async (user: TAuthUser, payload: TLoadInfo) => {
    const round = payload.round
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        let roundExist = await tx.round.findFirst({ where: { name: round } })
        if (!roundExist) {
            roundExist = await tx.round.create({ data: { name: round, vataId: user.vataId } })
        }
        const loadData = {
            roundId: roundExist.id,
            date: payload.date,
            quantity: Number(payload.quantity),
            loadType: payload.loadType,
            classType: payload.classType || null
        }
        const load = await tx.loadInfo.create({
            data: loadData,
        });
        return load
    })
    return result;
};

// GET ALL LOAD INFO
const getAllLoadInfoService = async (user: TAuthUser, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(
        query.page,
        query.limit,
    );

    const where: Prisma.LoadInfoWhereInput = {
        isDeleted: false,
        round: { vataId: user.vataId }
    };

    // DATE FILTER
    if (query.date) {
        const dateRange = getDateRangeDbSearch(query.date);
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
        prisma.loadInfo.findMany({
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

        prisma.loadInfo.count({
            where,
        }),
    ]);

    const meta = createMetaConfig({
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
const getSingleLoadInfoService = async (user: TAuthUser, id: string) => {
    return await prisma.loadInfo.findFirst({
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
const updateLoadInfoService = async (
    user: TAuthUser,
    id: string,
    payload: TLoadInfo
) => {
    const result = await prisma.$transaction(async (tx) => {
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
                },
            });
        }

        // Update load info
        const load = await tx.loadInfo.update({
            where: {
                id,
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
const deleteLoadInfoService = async (user: TAuthUser, id: string) => {
    return await prisma.loadInfo.update({
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

export const LoadInfoService = {
    createLoadInfoService,
    getAllLoadInfoService,
    getSingleLoadInfoService,
    updateLoadInfoService,
    deleteLoadInfoService,
};