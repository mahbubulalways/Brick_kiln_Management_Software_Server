import { StatusCodes } from "http-status-codes"
import { CarRent, Prisma } from "../../../generated/prisma/client"
import { paginationHelper } from "../../../helpers/paginationHelper"
import { prisma } from "../../../helpers/prisma"
import { TQuery } from "../../../interface/query"
import { createMetaConfig } from "../../../utils/createMetaConfig"
import { AppError } from "../../errors/ApplicationError"

// CREATE RENT
const createCarRentService = async (data: CarRent) => {
    const result = await prisma.carRent.create({ data })
    return result
}

// GET ALL RENT
const getALlCarRentService = async (query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit);
    const where: Prisma.CarRentWhereInput = {};

    // Search by ledger name
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                area: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                address: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma.carRent.findMany({ where, skip, take: limit }),
        prisma.carRent.count({ where })
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

// GET SINGLE CAR RENT
const getSingleCarRentService = async (id: number) => {
    const result = await prisma.carRent.findFirst({ where: { id } })
    return result
}

// UPDATE CAR RENT
const updateCarRentService = async (
    id: number,
    payload: Prisma.CarRentUpdateInput
) => {
    const existing = await prisma.carRent.findUnique({
        where: {
            id,
        },
    });

    if (!existing) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।"
        );
    }

    const result = await prisma.carRent.update({
        where: {
            id,
        },
        data: payload,
    });

    return result;
};


// DELETE CAR RENT
const deleteCarRentService = async (id: number) => {
    const existing = await prisma.carRent.findUnique({
        where: {
            id,
        },
    });

    if (!existing) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।"
        );
    }

    await prisma.carRent.delete({
        where: {
            id,
        },
    });

    return true;
};

export const CarRentService = {
    createCarRentService,
    getALlCarRentService,
    getSingleCarRentService,
    updateCarRentService,
    deleteCarRentService
}