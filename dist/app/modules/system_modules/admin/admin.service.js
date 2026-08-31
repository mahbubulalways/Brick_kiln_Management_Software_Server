"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const ApplicationError_1 = require("../../../errors/ApplicationError");
const prisma_1 = require("../../../../helpers/prisma");
const client_1 = require("../../../../generated/prisma/client");
const bcryptHelper_1 = require("../../../../helpers/bcryptHelper");
const http_status_codes_1 = require("http-status-codes");
const createSuperAdminService = async (payload) => {
    // Check existing super admin
    const existingAdmin = await prisma_1.prisma.user.findFirst({
        where: {
            username: payload.username,
            role: client_1.UserRole.SUPER_ADMIN,
            isDeleted: false,
        },
    });
    if (existingAdmin) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ইউজারনেম দিয়ে ইতোমধ্যে একজন রয়েছে");
    }
    // Hash password
    const hashedPassword = await bcryptHelper_1.bcryptHelper.hashPassword(payload.password);
    // Create super admin
    const user = await prisma_1.prisma.user.create({
        data: {
            password: hashedPassword,
            username: payload.username,
            role: client_1.UserRole.SUPER_ADMIN,
            name: payload.name,
        },
    });
    return user;
};
exports.AdminService = {
    createSuperAdminService,
};
