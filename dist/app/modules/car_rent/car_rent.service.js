"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
const activity_service_1 = require("../activity/activity.service");
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
        prisma_1.prisma.carRent.count({ where }),
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
    const result = await prisma_1.prisma.carRent.findFirst({
        where: { id, vataId: user.vataId },
    });
    return result;
};
const updateCarRentService = async (user, id, payload) => {
    const existing = await prisma_1.prisma.carRent.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
    const oldData = {
        address: existing.address,
        rent: existing.rent,
        area: existing.area,
    };
    const newData = {
        address: payload.address,
        rent: payload.rent,
        area: payload.area,
    };
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.carRent.update({
                where: {
                    id,
                },
                data: {
                    ...payload,
                    updateStatus: "APPROVED",
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "UPDATE",
                module: "CAR_RENT",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData,
                newData,
                referenceNumber: oldData.rent,
            });
            return result;
        });
        return {
            result,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে আপডেট করা হয়েছে।",
        };
    }
    await prisma_1.prisma.carRent.update({
        where: {
            id,
        },
        data: {
            updateStatus: "PENDING",
        },
    });
    const result = await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "UPDATE",
            module: "CAR_RENT",
            targetId: id,
            requestedById: user.userId,
            vataId: user.vataId,
            status: "PENDING",
            oldData,
            newData,
        },
    });
    return {
        result,
        message: "গাড়ি ভাড়ার তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
// DELETE CAR RENT
const deleteCarRentService = async (user, id) => {
    const existing = await prisma_1.prisma.carRent.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
    const oldData = {
        address: existing.address,
        rent: existing.rent,
        area: existing.area,
    };
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            await tx.carRent.delete({
                where: { id },
            });
            return await activity_service_1.ActivityService.createActivityService({
                action: "DELETE",
                module: "CAR_RENT",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData,
                referenceNumber: oldData.rent,
            });
        });
        return {
            result,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    const result = await prisma_1.prisma.carRent.update({
        where: { id },
        data: {
            deleteStatus: "PENDING",
        },
    });
    await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "DELETE",
            module: "CAR_RENT",
            targetId: id,
            requestedById: user.userId,
            vataId: user.vataId,
            status: "PENDING",
            oldData,
        },
    });
    return {
        result,
        message: "গাড়ি ভাড়ার তথ্য মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
exports.CarRentService = {
    createCarRentService,
    getALlCarRentService,
    getSingleCarRentService,
    updateCarRentService,
    deleteCarRentService,
};
