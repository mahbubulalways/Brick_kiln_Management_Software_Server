"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsCategoryService = void 0;
const prisma_1 = require("../../../helpers/prisma");
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
    const result = await prisma_1.prisma.goodsStockCategory.update({
        where: {
            vataId: user.vataId,
            id,
        },
        data: {
            ...payload,
        },
    });
    return result;
};
const deleteGoodCategoryService = async (user, id) => {
    const result = await prisma_1.prisma.goodsStockCategory.update({
        where: {
            vataId: user.vataId,
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
};
exports.GoodsCategoryService = {
    createGoodCategoryService,
    getGoodCategoryService,
    getSingleGoodCategoryService,
    updateGoodCategoryService,
    deleteGoodCategoryService,
    getGoodCategoryOptionsService,
};
