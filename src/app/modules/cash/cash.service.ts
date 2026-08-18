import { Cash, Prisma } from "../../../generated/prisma/client"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { prisma } from "../../../helpers/prisma"
import { TQuery } from "../../../interface/query"
import { createMetaConfig } from "../../../utils/createMetaConfig"
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch"


// CREATE CASH
const createCashService = async (payload: Cash) => {
    const result = prisma.cash.create({ data: payload })
    return result
}

// GET ALL CASH 
const getAllCashService = async (query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit);
    const where: Prisma.CashWhereInput = { isDeleted: false };
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
const getSingleCashService = async (id: number) => {
    return await prisma.cash.findFirst({ where: { id } })
}

// UPDATE CASH
const updateCashService = async (id: number, payload: Cash) => {
    return prisma.cash.update({ data: payload, where: { id } })
}

// DELETE CASH
const deleteCashService = async (id: number) => {
    return prisma.cash.update({ data: { isDeleted: true }, where: { id } })
}

export const CashService = {
    createCashService,
    getAllCashService,
    getSingleCashService,
    updateCashService,
    deleteCashService
}