import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { TLoadPayload } from "./unload.interface";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { TAuthUser } from "../../../interface/token";


const createNewUnloadService = async (
    user: TAuthUser,
    seasonId: string,
    payload: TLoadPayload
) => {
    const startOfDay = new Date(payload.date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(payload.date);
    endOfDay.setHours(23, 59, 59, 999);

    const quantity = Number(payload.quantity);

    if (quantity <= 0) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "পরিমাণ অবশ্যই ০ এর বেশি হতে হবে।"
        );
    }

    const result = await prisma.$transaction(async (tx) => {
        const round = await tx.round.findFirst({
            where: {
                name: payload.round,
                vataId: user.vataId,
                seasonId,
            },
            select: {
                id: true,
            },
        });

        if (!round?.id) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "রাউন্ড পাওয়া যায়নি।"
            );
        }

        let unload = await tx.unload.findFirst({
            where: {
                roundId: round.id,
                round: {
                    vataId: user.vataId,
                    seasonId,
                },
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: {
                id: true,
            },
        });

        if (!unload?.id) {
            unload = await tx.unload.create({
                data: {
                    date: payload.date,
                    roundId: round.id,
                },
                select: {
                    id: true,
                },
            });
        }

        const classInfo = await tx.classAndRate.findFirst({
            where: {
                className: payload.className,
                vataId: user.vataId,
            },
            select: {
                id: true,
            },
        });

        if (!classInfo) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "কোনো শ্রেণি পাওয়া যায়নি।"
            );
        }

        const brickStock = await tx.brickStockSummary.findFirst({
            where: {
                vataId: user.vataId,
            },
        });

        if (!brickStock) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "ইটের স্টক পাওয়া যায়নি।"
            );
        }

        const existingItem = await tx.unloadItem.findFirst({
            where: {
                classId: classInfo.id,
                unloadId: unload.id,
            },
        });

        let item;

        if (existingItem) {
            const oldQuantity = Number(existingItem.quantity);
            const difference = quantity - oldQuantity;

            if (difference > 0) {
                const currentChulliBrick = Number(
                    brickStock.chulliBrick
                );

                if (currentChulliBrick < difference) {
                    throw new AppError(
                        StatusCodes.BAD_REQUEST,
                        `চুল্লিতে পর্যাপ্ত ইট নেই। বর্তমানে চুল্লিতে ${currentChulliBrick} টি ইট আছে।`
                    );
                }

                await tx.brickStockSummary.update({
                    where: {
                        id: brickStock.id,
                    },
                    data: {
                        chulliBrick: {
                            decrement: difference,
                        },
                    },
                });
            }

            if (difference < 0) {
                await tx.brickStockSummary.update({
                    where: {
                        id: brickStock.id,
                    },
                    data: {
                        chulliBrick: {
                            increment: Math.abs(difference),
                        },
                    },
                });
            }

            item = await tx.unloadItem.update({
                where: {
                    id: existingItem.id,
                },
                data: {
                    quantity,
                },
            });
        } else {
            const currentChulliBrick = Number(
                brickStock.chulliBrick
            );

            if (currentChulliBrick < quantity) {
                throw new AppError(
                    StatusCodes.BAD_REQUEST,
                    `চুল্লিতে পর্যাপ্ত ইট নেই। বর্তমানে চুল্লিতে ${currentChulliBrick} টি ইট আছে।`
                );
            }

            item = await tx.unloadItem.create({
                data: {
                    classId: classInfo.id,
                    quantity,
                    unloadId: unload.id,
                },
            });

            await tx.brickStockSummary.update({
                where: {
                    id: brickStock.id,
                },
                data: {
                    chulliBrick: {
                        decrement: quantity,
                    },
                },
            });
        }

        return item;
    });

    return result;
};




// GET ALL UNLOAD
const getAllUnloadService = async (user: TAuthUser, seasonId: string, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(
        query.page,
        query.limit,
    );

    const where: Prisma.UnloadWhereInput = {
        isDeleted: false,
        round: {
            vataId: user.vataId,
            seasonId
        }
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
                items: {
                    include: {
                        class: {
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
const getAllUnloadDataNoPaginateService = async (user: TAuthUser) => {
    const result = await prisma.unload.findMany({
        where: {
            isDeleted: false,
            round: { vataId: user.vataId, }
        },
        select: {
            date:true,
            round: {
                select: {
                    name: true
                }
            },
            items: {
                select: {
                    quantity: true,
                    class: {
                        select: {
                            className: true,
                            id: true,
                            classType: true
                        }
                    }
                }
            }
        }

    })
    console.log(result)
    return result

};

const deleteUnloadService = async (user: TAuthUser, id: string) => {
    const isExist = await prisma.unload.findFirst({ where: { id, round: { vataId: user.vataId, } } })
    if (!isExist) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "আনলোডের তথ্য পাওয়া যায়নি"
        );
    }
    const result = await prisma.unload.update({ where: { id, round: { vataId: user.vataId, } }, data: { isDeleted: true } })
    return result
}

export const UnloadService = {
    createNewUnloadService,
    getAllUnloadService,
    deleteUnloadService,
    getAllUnloadDataNoPaginateService
}