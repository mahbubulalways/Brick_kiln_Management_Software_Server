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
        email: user.username,
        userId: user.id,
        role: user.role,
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
exports.AuthService = { loginUserToSystemService };
