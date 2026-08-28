"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
// ড্রাইভার তৈরি
const createDriverService = async (user, payload) => {
    const driver = await prisma_1.prisma.driver.create({
        data: {
            name: payload.name,
            PhoneNumber: payload.PhoneNumber,
            salary: payload.salary,
            vataId: user.vataId,
        },
    });
    return driver;
};
// সকল ড্রাইভার পাওয়া
const getAllDriversService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [drivers, total] = await Promise.all([
        prisma_1.prisma.driver.findMany({
            where: {
                vataId: user.vataId,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.driver.count()
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        data: drivers,
        meta
    };
};
// নির্দিষ্ট একজন ড্রাইভার পাওয়া
const getSingleDriverService = async (user, id) => {
    const driver = await prisma_1.prisma.driver.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!driver) {
        throw new Error("ড্রাইভার খুঁজে পাওয়া যায়নি");
    }
    return driver;
};
// ড্রাইভার আপডেট
const updateDriverService = async (user, id, payload) => {
    const existingDriver = await prisma_1.prisma.driver.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!existingDriver) {
        throw new Error("ড্রাইভার খুঁজে পাওয়া যায়নি");
    }
    const driver = await prisma_1.prisma.driver.update({
        where: {
            id,
        },
        data: {
            ...(payload.name !== undefined && {
                name: payload.name,
            }),
            ...(payload.PhoneNumber !== undefined && {
                PhoneNumber: payload.PhoneNumber,
            }),
            ...(payload.salary !== undefined && {
                salary: payload.salary,
            }),
        },
    });
    return driver;
};
// ড্রাইভার ডিলিট
const deleteDriverService = async (user, id) => {
    const existingDriver = await prisma_1.prisma.driver.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!existingDriver) {
        throw new Error("ড্রাইভার খুঁজে পাওয়া যায়নি");
    }
    await prisma_1.prisma.driver.delete({
        where: {
            id,
        },
    });
    return null;
};
const driverOptionsForDeliveryService = async (user) => {
    const driver = await prisma_1.prisma.driver.findMany({
        where: {
            vataId: user.vataId
        }, select: { name: true, id: true, PhoneNumber: true }
    });
    return driver;
};
exports.DriverService = {
    createDriverService,
    getAllDriversService,
    getSingleDriverService,
    updateDriverService,
    deleteDriverService,
    driverOptionsForDeliveryService
};
