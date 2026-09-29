"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsCategoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const activity_service_1 = require("../activity/activity.service");
const createGoodCategoryService = async (user, payload) => {
    const result = await prisma_1.prisma.goodsStockCategory.create({
        data: {
            ...payload,
            vataId: user.vataId,
        },
    });
    return result;
};
const getGoodCategoryService = async (user) => {
    const result = await prisma_1.prisma.goodsStockCategory.findMany({
        where: {
            vataId: user.vataId,
            isDeleted: false,
        },
        include: {
            _count: { select: { goodsStocks: true } },
        },
    });
    return result;
};
const getGoodCategoryOptionsService = async (user) => {
    const result = await prisma_1.prisma.goodsStockCategory.findMany({
        where: {
            vataId: user.vataId,
            isDeleted: false,
        },
        select: {
            name: true,
            id: true,
        },
    });
    return result;
};
const getSingleGoodCategoryService = async (user, id) => {
    const result = await prisma_1.prisma.goodsStockCategory.findFirst({
        where: {
            vataId: user.vataId,
            id,
        },
    });
    return result;
};
const updateGoodCategoryService = async (user, id, payload) => {
    const oldCategory = await prisma_1.prisma.goodsStockCategory.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
        select: {
            name: true,
        },
    });
    if (!oldCategory) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "পণ্যের ক্যাটাগরি পাওয়া যায়নি।");
    }
    const formatOldData = {
        name: oldCategory.name,
    };
    const formatNewData = {
        name: payload.name,
    };
    // ADMIN / OWNER
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.goodsStockCategory.update({
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
                module: "GOODS_STOCK_CATEGORY",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData: formatOldData,
                newData: formatNewData,
            });
            return result;
        });
        return {
            result,
            message: "পণ্যের ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে।",
        };
    }
    // NON ADMIN / OWNER → APPROVAL REQUEST
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.goodsStockCategory.update({
            where: {
                id,
            },
            data: {
                updateStatus: "PENDING",
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "UPDATE",
                module: "GOODS_STOCK_CATEGORY",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: formatOldData,
                newData: formatNewData,
            },
        });
    });
    return {
        result,
        message: "পণ্যের ক্যাটাগরি আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
const deleteGoodCategoryService = async (user, id) => {
    const oldCategory = await prisma_1.prisma.goodsStockCategory.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!oldCategory) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "পণ্যের ক্যাটাগরি পাওয়া যায়নি।");
    }
    const formatOldData = {
        name: oldCategory.name,
    };
    // ADMIN / OWNER
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.goodsStockCategory.update({
                where: {
                    id,
                },
                data: {
                    isDeleted: true,
                    deleteStatus: "APPROVED",
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "DELETE",
                module: "GOODS_STOCK_CATEGORY",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData: formatOldData,
                referenceNumber: formatOldData.name,
            });
            return result;
        });
        return {
            result,
            message: "পণ্যের ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    // NON ADMIN / OWNER → DELETE APPROVAL REQUEST
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.goodsStockCategory.update({
            where: {
                id,
            },
            data: {
                deleteStatus: "PENDING",
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "DELETE",
                module: "GOODS_STOCK_CATEGORY",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: formatOldData,
            },
        });
    });
    return {
        result,
        message: "পণ্যের ক্যাটাগরি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
exports.GoodsCategoryService = {
    createGoodCategoryService,
    getGoodCategoryService,
    getSingleGoodCategoryService,
    updateGoodCategoryService,
    deleteGoodCategoryService,
    getGoodCategoryOptionsService,
};
