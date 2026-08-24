"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
// CREATE RENT
const createCarRentService = async (user, data) => {
    data.vataId = user.vataId;
    const result = await prisma_1.prisma.carRent.create({ data });
    return result;
};
// GET ALL RENT
const getALlCarRentService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { vataId: user.vataId };
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
const getSingleCarRentService = async (user, id) => {
    const result = await prisma_1.prisma.carRent.findFirst({ where: { id, vataId: user.vataId } });
    return result;
};
// UPDATE CAR RENT
const updateCarRentService = async (user, id, payload) => {
    const existing = await prisma_1.prisma.carRent.findUnique({
        where: {
            id,
            vataId: user.vataId
        },
    });
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.carRent.update({
        where: {
            id,
            vataId: user.vataId
        },
        data: payload,
    });
    return result;
};
// DELETE CAR RENT
const deleteCarRentService = async (user, id) => {
    const existing = await prisma_1.prisma.carRent.findUnique({
        where: {
            id,
            vataId: user.vataId
        },
    });
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
    await prisma_1.prisma.carRent.delete({
        where: {
            id,
            vataId: user.vataId
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
