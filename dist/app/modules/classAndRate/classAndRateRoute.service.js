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
                isDeleted: false
            }, orderBy: { createdAt: "asc" },
        }),
        prisma_1.prisma.classAndRate.count({
            where: {
                vataId: user.vataId,
                isDeleted: false
            }
        })
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        data: result,
        meta
    };
};
// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (user, id) => {
    const result = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            vataId: user.vataId, id,
            isDeleted: false
        }
    });
    return result;
};
// GET SINGLE CLASS AND RATE
const updateClassAndRateService = async (user, id, data) => {
    const result = await prisma_1.prisma.classAndRate.update({
        data: data,
        where: { vataId: user.vataId, id },
    });
    return result;
};
// DELETYE
const deleteClassAndRateService = async (user, id) => {
    const result = await prisma_1.prisma.classAndRate.update({
        data: {
            isDeleted: true
        },
        where: { vataId: user.vataId, id },
    });
    return result;
};
// GET OPTIONS 
const getClassAndRateOptionsService = async (user) => {
    const result = await prisma_1.prisma.classAndRate.findMany({
        where: {
            vataId: user.vataId,
            isDeleted: false
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
    getClassAndRateOptionsService
};
