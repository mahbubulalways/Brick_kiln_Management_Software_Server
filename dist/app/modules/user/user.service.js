"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_codes_1 = require("http-status-codes");
const bcryptHelper_1 = require("../../../helpers/bcryptHelper");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const activity_service_1 = require("../activity/activity.service");
const createUserServie = async (user, payload) => {
    const existUsername = await prisma_1.prisma.user.findFirst({
        where: {
            username: payload.username,
            vataId: user.vataId,
        },
    });
    if (existUsername) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।");
    }
    const hashPassword = await bcryptHelper_1.bcryptHelper.hashPassword(payload.password);
    payload.password = hashPassword;
    payload.vataId = user.vataId;
    const result = await prisma_1.prisma.user.create({
        data: payload,
    });
    return result;
};
// Get All Users
const getAllUsersService = async (user) => {
    const result = await prisma_1.prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            isDeleted: false,
            vataId: user.vataId,
        },
    });
    return result;
};
// Get Single User
const getSingleUserService = async (user, id) => {
    const result = await prisma_1.prisma.user.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    return result;
};
// UPDATE USER
const updateUserService = async (userAuth, id, payload) => {
    const existingUser = await prisma_1.prisma.user.findFirst({
        where: {
            id,
            vataId: userAuth.vataId,
        },
    });
    if (!existingUser) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
    }
    if (payload.username && payload.username !== existingUser.username) {
        const existUsername = await prisma_1.prisma.user.findFirst({
            where: {
                username: payload.username,
                vataId: userAuth.vataId,
                NOT: {
                    id,
                },
            },
        });
        if (existUsername) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ইউজারনেমটি ইতোমধ্যে ব্যবহার করা হয়েছে।");
        }
    }
    const oldData = {
        username: existingUser.username,
        role: existingUser.role,
        name: existingUser.name,
    };
    const newData = {
        username: payload.username ?? existingUser.username,
        role: payload.role ?? existingUser.role,
        name: payload.name ?? existingUser.name,
    };
    if (userAuth.role === "ADMIN" || userAuth.role === "OWNER") {
        const updateData = { ...payload };
        if (updateData.password) {
            updateData.password = await bcryptHelper_1.bcryptHelper.hashPassword(updateData.password);
        }
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.user.update({
                where: {
                    id,
                },
                data: {
                    ...updateData,
                    updateStatus: "APPROVED",
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "UPDATE",
                module: "USER",
                targetId: id,
                userId: userAuth.userId,
                vataId: userAuth.vataId,
                oldData,
                newData,
                referenceNumber: oldData.name,
            });
            return result;
        });
        return {
            result,
            message: "ইউজারের তথ্য সফলভাবে আপডেট করা হয়েছে।",
        };
    }
    await prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: {
            updateStatus: "PENDING",
        },
    });
    const result = await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "UPDATE",
            module: "USER",
            targetId: id,
            requestedById: userAuth.userId,
            vataId: userAuth.vataId,
            status: "PENDING",
            oldData,
            newData,
        },
    });
    return {
        result,
        message: "ইউজারের তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
// DELETE USER
const deleteUserService = async (userAuth, id) => {
    const existingUser = await prisma_1.prisma.user.findFirst({
        where: {
            id,
            vataId: userAuth.vataId,
        },
    });
    if (!existingUser) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
    }
    const oldData = {
        username: existingUser.username,
        role: existingUser.role,
        name: existingUser.name,
    };
    if (userAuth.role === "ADMIN" || userAuth.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.user.update({
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
                module: "USER",
                targetId: id,
                userId: userAuth.userId,
                vataId: userAuth.vataId,
                oldData,
                referenceNumber: oldData.name,
            });
            return result;
        });
        return {
            result,
            message: "ইউজার সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    await prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: {
            deleteStatus: "PENDING",
        },
    });
    const result = await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "DELETE",
            module: "USER",
            targetId: id,
            requestedById: userAuth.userId,
            vataId: userAuth.vataId,
            status: "PENDING",
            oldData,
        },
    });
    return {
        result,
        message: "ইউজার মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
// GET LOGIN LOGOUT HISTORY
const getUserLoginHistoryService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.loginHistory.findMany({
            where: {
                user: {
                    vataId: user.vataId,
                },
            },
            include: { user: { select: { name: true } } },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.loginHistory.count({}),
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
const getUserOptionService = async (user) => {
    const result = await prisma_1.prisma.user.findMany({
        where: {
            isDeleted: false,
            vataId: user.vataId,
        },
        select: {
            name: true,
            id: true,
        },
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
    getUserOptionService,
};
