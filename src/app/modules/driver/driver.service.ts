import { Driver } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";

// ড্রাইভার তৈরি
const createDriverService = async (
    user: TAuthUser,
    payload: Driver
) => {
    const driver = await prisma.driver.create({
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
const getAllDriversService = async (user: TAuthUser, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(
        query.page,
        query.limit,
    );

    const [drivers, total] = await Promise.all([
        prisma.driver.findMany({
            where: {
                vataId: user.vataId,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.driver.count()
    ]);
    const meta = createMetaConfig({
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
const getSingleDriverService = async (
    user: TAuthUser,
    id: string
) => {
    const driver = await prisma.driver.findFirst({
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
const updateDriverService = async (
    user: TAuthUser,
    id: string,
    payload: Partial<Driver>
) => {
    const existingDriver = await prisma.driver.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });

    if (!existingDriver) {
        throw new Error("ড্রাইভার খুঁজে পাওয়া যায়নি");
    }

    const driver = await prisma.driver.update({
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
const deleteDriverService = async (
    user: TAuthUser,
    id: string
) => {
    const existingDriver = await prisma.driver.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });

    if (!existingDriver) {
        throw new Error("ড্রাইভার খুঁজে পাওয়া যায়নি");
    }

    await prisma.driver.delete({
        where: {
            id,
        },
    });

    return null;
};


const driverOptionsForDeliveryService = async (user: TAuthUser) => {
    const driver = await prisma.driver.findMany({
        where: {
            vataId: user.vataId
        }, select: { name: true, id: true, PhoneNumber: true  }
    })
    return driver
}

export const DriverService = {
    createDriverService,
    getAllDriversService,
    getSingleDriverService,
    updateDriverService,
    deleteDriverService,
    driverOptionsForDeliveryService
};