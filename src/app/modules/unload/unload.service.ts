import { StatusCodes } from "http-status-codes";
import { Prisma, Unload } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { TLoadPayload } from "./unload.interface";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { createMetaConfig } from "../../../utils/createMetaConfig";

const createNewUnloadService = async (payload: TLoadPayload) => {
    const startOfDay = new Date(payload.date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(payload.date);
    endOfDay.setHours(23, 59, 59, 999);

    const result = await prisma.$transaction(async (tx) => {
        const roundId = await tx.round.findFirst({ where: { name: payload.round }, select: { id: true } })
        if (!roundId?.id) {
            throw new AppError(StatusCodes.NOT_FOUND, "ROUND ID PAI NAI")
        }

        let unload = await tx.unload.findFirst({
            where: {
                roundId: roundId.id, date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: { id: true }
        })

        if (!unload?.id) {
            unload = await tx.unload.create({
                data: {
                    date: payload.date,
                    roundId: roundId?.id,

                }
            })
        }

        // FIND CLASS ID
        const classId = await tx.classAndRate.findFirst({
            where: { className: payload.className },
            select: { id: true }
        })

        if (!classId) {
            throw new AppError(StatusCodes.NOT_FOUND, "CLASS PAI NAI")
        }

        const findRoundItem = await tx.unloadItem.findFirst({
            where: { classId: classId?.id, unloadId: unload.id }
        })

        let item;
        if (findRoundItem) {
            item = await tx.unloadItem.update({
                where: {
                    id: findRoundItem.id,
                },
                data: {
                    quantity: Number(payload.quantity),
                }
            })
        } else {
            item = await tx.unloadItem.create({
                data: {
                    classId: classId?.id,
                    quantity: Number(payload.quantity),
                    unloadId: unload.id
                }
            })
        }
        return item
    })

    return result


};

// gert

// GET ALL UNLOAD
const getAllUnloadService = async (query: TQuery) => {
    const { limit, page, skip } = paginationHelper(
        query.page,
        query.limit,
    );

    const where: Prisma.UnloadWhereInput = {
        isDeleted: false,
    };

    // DATE FILTER
    if (query.date) {
        const dateRange = getDateRangeDbSearch(query.date);
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
        prisma.unload.findMany({
            where,
            include: {
                round: true,
                unloadItems: {
                    include: {
                        classType: {
                            select: {
                                className: true
                                , id: true
                            }
                        }
                    }
                }
            },
            skip,
            take: limit
        }),
        prisma.unload.count({ where })
    ])
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


//  GET ALL DATA NOT PAGINATE
const getAllUnloadDataNoPaginateService = async () => {
    const result = await prisma.unload.findMany({
        where: {
            isDeleted: false,
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

    })

    return result

};

const deleteUnloadService = async (id: number) => {
    const isExist = await prisma.unload.findFirst({ where: { id } })
    if (!isExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "আনলোডের তথ্য পাওয়া যায়নি"
        );
    }
    const result = await prisma.unload.update({ where: { id }, data: { isDeleted: true } })
    return result
}
export const UnloadService = {
    createNewUnloadService,
    getAllUnloadService,
    deleteUnloadService,
    getAllUnloadDataNoPaginateService
}