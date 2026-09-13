"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataCarService = void 0;
const prisma_1 = require("../../../helpers/prisma");
// CRREATE CAR
const createNewVataACarService = async (user, payload) => {
    const result = await prisma_1.prisma.vataCar.create({
        data: {
            ...payload,
            vataId: user.vataId,
        },
    });
    return result;
};
// GET CAR
const getAllVataACarService = async (user) => {
    const result = await prisma_1.prisma.vataCar.findMany({
        where: {
            vataId: user.vataId,
        },
    });
    return result;
};
// GET SINGLE CAR AND DETAILS
const singleCarDeliveryIncomeService = async (user, id) => {
    console.log(id);
    const result = await prisma_1.prisma.vataCar.findFirst({
        where: { vataId: user.vataId, id },
        select: {
            carIncomeDeliveries: {
                select: {
                    amount: true,
                    createdAt: true,
                    delivery: {
                        select: {
                            deliveryNo: true,
                        },
                    },
                    driver: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return result;
};
// GET ALL CAR INCOME HISTORY
const getAllCarIncomeHistory = async (user) => {
    const result = await prisma_1.prisma.vataCar.findMany({
        where: { vataId: user.vataId },
        select: {
            carNo: true,
            id: true,
            carIncomeDeliveries: {
                select: {
                    amount: true,
                },
            },
        },
    });
    return result;
};
exports.VataCarService = {
    createNewVataACarService,
    getAllVataACarService,
    singleCarDeliveryIncomeService,
    getAllCarIncomeHistory,
};
