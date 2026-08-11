"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassAndRateService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const createClassAndRateService = async (payload) => {
    const isExist = await prisma_1.prisma.classAndRate.findFirst({
        where: {
            className: payload.className,
            // classType: payload.classType,
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই শ্রেণী ও রেট ইতিমধ্যে বিদ্যমান");
    }
    const result = await prisma_1.prisma.classAndRate.create({
        data: payload,
    });
    return result;
};
// GET ALL CLASS AND RATE
const getClassAndRateService = async () => {
    const result = await prisma_1.prisma.classAndRate.findMany({ orderBy: { createdAt: "asc" } });
    return result;
};
// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (id) => {
    const result = await prisma_1.prisma.classAndRate.findFirst({ where: { id } });
    return result;
};
// GET SINGLE CLASS AND RATE
const updateClassAndRateService = async (id, data) => {
    const result = await prisma_1.prisma.classAndRate.update({
        data: data,
        where: { id },
    });
    return result;
};
exports.ClassAndRateService = {
    createClassAndRateService,
    getClassAndRateService,
    getSingleClassAndRateService,
    updateClassAndRateService,
};
