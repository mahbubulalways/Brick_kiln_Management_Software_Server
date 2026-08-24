"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassAndRateService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const createClassAndRateService = async (user, payload) => {
    const isExist = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            className: payload.className,
            vataId: user.vataId,
            isDeleted: false
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই শ্রেণী ও রেট ইতিমধ্যে বিদ্যমান");
    }
    const result = await prisma_1.prisma.classAndRate.create({
        data: {
            ...payload,
            vataId: user.vataId
        },
    });
    return result;
};
// GET ALL CLASS AND RATE
const getClassAndRateService = async (user) => {
    const result = await prisma_1.prisma.classAndRate.findMany({
        where: {
            vataId: user.vataId,
            isDeleted: false
        }, orderBy: { createdAt: "asc" },
    });
    return result;
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
exports.ClassAndRateService = {
    createClassAndRateService,
    getClassAndRateService,
    getSingleClassAndRateService,
    updateClassAndRateService,
    deleteClassAndRateService
};
