"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
// CREATE RENT
const createCarRentService = async (data) => {
    const result = await prisma_1.prisma.carRent.create({ data });
    return result;
};
// GET ALL RENT
const getALlCarRentService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {};
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
        prisma_1.prisma.carRent.findMany({ where, skip, take: limit }),
        prisma_1.prisma.carRent.count({ where })
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
// GET SINGLE CAR RENT
const getSingleCarRentService = async (id) => {
    const result = await prisma_1.prisma.carRent.findFirst({ where: { id } });
    return result;
};
// UPDATE CAR RENT
const updateCarRentService = async (id, payload) => {
    const existing = await prisma_1.prisma.carRent.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.carRent.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
// DELETE CAR RENT
const deleteCarRentService = async (id) => {
    const existing = await prisma_1.prisma.carRent.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
    await prisma_1.prisma.carRent.delete({
        where: {
            id,
        },
    });
    return true;
};
exports.CarRentService = {
    createCarRentService,
    getALlCarRentService,
    getSingleCarRentService,
    updateCarRentService,
    deleteCarRentService
};
