"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassAndRateService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const createClassAndRateService = async (user, payload) => {
    // ==========================================
    // CHECK ACTIVE RECORD
    // ==========================================
    const isExist = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            vataId: user.vataId,
            classType: payload.classType,
            className: payload.className,
            isDeleted: false,
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই শ্রেণীর তথ্য ইতিমধ্যে বিদ্যমান");
    }
    // ==========================================
    // CHECK DELETED RECORD
    // ==========================================
    const deletedRecord = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            vataId: user.vataId,
            classType: payload.classType,
            className: payload.className,
            isDeleted: true,
        },
    });
    // ==========================================
    // RESTORE DELETED RECORD
    // ==========================================
    if (deletedRecord) {
        const result = await prisma_1.prisma.classAndRate.update({
            where: {
                id: deletedRecord.id,
            },
            data: {
                ...payload,
                isDeleted: false,
            },
        });
        return result;
    }
    // ==========================================
    // CREATE NEW RECORD
    // ==========================================
    const result = await prisma_1.prisma.classAndRate.create({
        data: {
            ...payload,
            vataId: user.vataId,
        },
    });
    return result;
};
// GET ALL CLASS AND RATE
const getClassAndRateService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.classAndRate.findMany({
            where: {
                vataId: user.vataId,
                isDeleted: false,
            },
            orderBy: { createdAt: "asc" },
        }),
        prisma_1.prisma.classAndRate.count({
            where: {
                vataId: user.vataId,
                isDeleted: false,
            },
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        data: result,
        meta,
    };
};
// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (user, id) => {
    const result = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            vataId: user.vataId,
            id,
            isDeleted: false,
        },
    });
    return result;
};
// UPDATE CLASS AND RATEs
const updateClassAndRateService = async (user, id, data) => {
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.classAndRate.update({
            data,
            where: {
                vataId: user.vataId,
                id,
            },
        });
        return {
            result,
            message: "শ্রেণী ও রেট সফলভাবে আপডেট হয়েছে",
        };
    }
    const findClassRate = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            vataId: user.vataId,
            id,
        },
        select: {
            advanceRate: true,
            className: true,
            classType: true,
            rate: true,
        },
    });
    if (!findClassRate) {
        throw new Error("শ্রেণী ও রেট পাওয়া যায়নি");
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.classAndRate.update({
            data: {
                updateStatus: "PENDING",
            },
            where: {
                vataId: user.vataId,
                id,
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "UPDATE",
                module: "CLASS_RATE",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: findClassRate,
                newData: data,
            },
        });
    });
    return {
        result,
        message: "শ্রেণী ও রেট আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
// DELETE CLASS AND RATE
const deleteClassAndRateService = async (user, id) => {
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.classAndRate.update({
            data: {
                isDeleted: true,
            },
            where: {
                vataId: user.vataId,
                id,
            },
        });
        return {
            result,
            message: "শ্রেণী ও রেট সফলভাবে মুছে ফেলা হয়েছে",
        };
    }
    const findClassRate = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            vataId: user.vataId,
            id,
        },
        select: {
            advanceRate: true,
            className: true,
            classType: true,
            rate: true,
        },
    });
    if (!findClassRate) {
        throw new Error("শ্রেণী ও রেট পাওয়া যায়নি");
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.classAndRate.update({
            data: {
                deleteStatus: "PENDING",
            },
            where: {
                vataId: user.vataId,
                id,
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "DELETE",
                module: "CLASS_RATE",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: findClassRate,
            },
        });
    });
    return {
        result,
        message: "শ্রেণী ও রেট মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
// GET OPTIONS
const getClassAndRateOptionsService = async (user) => {
    const result = await prisma_1.prisma.classAndRate.findMany({
        where: {
            vataId: user.vataId,
            isDeleted: false,
        },
        select: {
            className: true,
            id: true,
        },
        orderBy: { createdAt: "asc" },
    });
    return result;
};
exports.ClassAndRateService = {
    createClassAndRateService,
    getClassAndRateService,
    getSingleClassAndRateService,
    updateClassAndRateService,
    deleteClassAndRateService,
    getClassAndRateOptionsService,
};
