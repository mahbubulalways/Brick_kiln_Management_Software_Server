import { Cash, Prisma } from "../../../generated/prisma/client"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { prisma } from "../../../helpers/prisma"
import { TQuery } from "../../../interface/query"
import { TAuthUser } from "../../../interface/token"
import { createMetaConfig } from "../../../utils/createMetaConfig"
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch"


// CREATE CASH
const createCashService = async (user: TAuthUser, payload: Cash) => {
    const result = prisma.cash.create({
        data: {
            ...payload,
            vataId: user.vataId
        }
    })
    return result
}

// GET ALL CASH 
const getAllCashService = async (user: TAuthUser, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit);
    const where: Prisma.CashWhereInput = { isDeleted: false, vataId: user.vataId };
    if (query.date) {
        const dateRange = getDateRangeDbSearch(query.date);
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
        prisma.cash.findMany({ where, skip, take: limit }),
        prisma.cash.count({ where })
    ])

    const meta = createMetaConfig({
        limit: limit,
        page: page,
        totalData: total,
    });

    return {
        meta,
        data: result,
    };


}


// GET SINGLE CASH
const getSingleCashService = async (user: TAuthUser, id: string) => {
    return await prisma.cash.findFirst({ where: { id, vataId: user.vataId } })
}

// UPDATE CASH
const updateCashService = async (user: TAuthUser, id: string, payload: Cash) => {
    return prisma.cash.update({ data: payload, where: { id, vataId: user.vataId } })
}

// DELETE CASH
const deleteCashService = async (user: TAuthUser, id: string) => {
    return prisma.cash.update({ data: { isDeleted: true }, where: { id, vataId: user.vataId } })
}

export const CashService = {
    createCashService,
    getAllCashService,
    getSingleCashService,
    updateCashService,
    deleteCashService
}