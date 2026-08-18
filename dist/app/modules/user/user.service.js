"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcryptHelper_1 = require("../../../helpers/bcryptHelper");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const createUserServie = async (payload) => {
    const existUsername = await prisma_1.prisma.user.findFirst({
        where: {
            username: payload.username,
        },
    });
    if (existUsername) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।");
    }
    const hashPassword = await bcryptHelper_1.bcryptHelper.hashPassword(payload.password);
    payload.password = hashPassword;
    const result = await prisma_1.prisma.user.create({
        data: payload,
    });
    return result;
};
// Get All Users
const getAllUsersService = async () => {
    const result = await prisma_1.prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isDeleted: false
        }
    });
    return result;
};
// Get Single User
const getSingleUserService = async (id) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            id,
        },
    });
    return user;
};
// Update User
const updateUserService = async (id, payload) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            id,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
    }
    // Username change হলে duplicate check
    if (payload.username && payload.username !== user.username) {
        const existUsername = await prisma_1.prisma.user.findFirst({
            where: {
                username: payload.username,
                NOT: {
                    id,
                },
            },
        });
        if (existUsername) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।");
        }
    }
    // Password update হলে hash করা
    if (payload.password) {
        payload.password = await bcryptHelper_1.bcryptHelper.hashPassword(payload.password);
    }
    const result = await prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
// Delete User
const deleteUserService = async (id) => {
    const user = await prisma_1.prisma.user.findFirst({
        where: {
            id,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
    }
    await prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: {
            isDeleted: true
        }
    });
    return null;
};
// GET LOGIN LOGOUT HISTORY
const getUserLoginHistoryService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.loginHistory.findMany({
            include: { user: { select: { name: true } } },
            skip, take: limit,
            orderBy: { createdAt: "desc" }
        }),
        prisma_1.prisma.loginHistory.count({})
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
// GET USER OPTIONS
const getUserOptionService = async () => {
    const result = await prisma_1.prisma.user.findMany({
        where: {
            isDeleted: false
        },
        select: {
            name: true, id: true
        }
    });
    return result;
};
exports.UserService = {
    createUserServie,
    getAllUsersService,
    getSingleUserService,
    updateUserService,
    deleteUserService,
    getUserLoginHistoryService,
    getUserOptionService
};
