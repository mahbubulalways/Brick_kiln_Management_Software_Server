"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../config");
const ApplicationError_1 = require("../../errors/ApplicationError");
const bcryptHelper_1 = require("../../../helpers/bcryptHelper");
const auth_utils_1 = require("./auth.utils");
const prisma_1 = require("../../../helpers/prisma");
const userData = {
    name: "Mahbubul Hasan",
    username: "mahbub",
    role: "ADMIN",
    password: "12345678",
};
const loginUserToSystemService = async (payload, ip) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            username: payload.username,
        },
    });
    // const u = await UserService.createUserServie(userData)
    // console.log(u)
    // User not found
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
    }
    // Password validation
    const isPasswordMatched = await bcryptHelper_1.bcryptHelper.comparePassword(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "ইউজারনেম অথবা পাসওয়ার্ড সঠিক নয়।");
    }
    // Login history
    await prisma_1.prisma.loginHistory.create({
        data: {
            type: "Login",
            device: payload.extra?.device || "Unknown",
            browser: payload.extra?.browser || "Unknown",
            ipAddress: ip || "Unknown",
            userId: user.id,
        },
    });
    // JWT payload
    const tokenInfo = {
        username: user.username,
        userId: user.id,
        role: user.role,
        vataId: user.vataId,
    };
    // Access token
    const accessToken = await auth_utils_1.jwtHelper.generateToken(tokenInfo, config_1.Config.ACCESS_TOKEN_SECRET, "5D");
    // Refresh token
    const refreshToken = await auth_utils_1.jwtHelper.generateToken(tokenInfo, config_1.Config.REFRESH_TOKEN_SECRET, "30D");
    return {
        accessToken,
        refreshToken,
    };
};
// LOGOUT
const logoutUserService = async (userAuth, username, ip, payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            username,
            vataId: userAuth.vataId,
        },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "প্রদত্ত তথ্যের সাথে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
    }
    if (user.role !== "SUPER_ADMIN" && user.role !== "SYSTEM_ADMIN") {
        await prisma_1.prisma.loginHistory.create({
            data: {
                type: "Logout",
                device: payload?.device || "Unknown",
                browser: payload?.browser || "Unknown",
                ipAddress: ip || "Unknown",
                userId: user.id,
            },
        });
    }
    return {
        id: user.id,
    };
};
// CHANGE PASSWORD
const changePasswordServie = async (user, payload) => {
    const mainUser = await prisma_1.prisma.user.findFirst({
        where: {
            username: user.username,
            vataId: user.vataId,
        },
    });
    if (!mainUser) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ব্যবহারকারী খুঁজে পাওয়া যায়নি।");
    }
    const matchPassword = await bcryptHelper_1.bcryptHelper.comparePassword(payload.oldPassword, mainUser.password);
    if (!matchPassword) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পুরাতন পাসওয়ার্ড সঠিক নয়।");
    }
    const hashedPassword = await bcryptHelper_1.bcryptHelper.hashPassword(payload.newPassword);
    const result = await prisma_1.prisma.user.update({
        where: {
            id: mainUser.id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return result;
};
exports.AuthService = {
    loginUserToSystemService,
    logoutUserService,
    changePasswordServie,
};
