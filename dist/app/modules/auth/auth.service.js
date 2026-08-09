"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../config");
const ApplicationError_1 = require("../../errors/ApplicationError");
const auth_utils_1 = require("./auth.utils");
const prisma_1 = require("../../../helpers/prisma");
const loginUserToSystemService = async (payload) => {
    // const res = await prisma.user.create({
    //   data: { email: "admin@gmail.com", password: "12345678" },
    // });
    const user = await prisma_1.prisma.user.findFirst({
        where: { email: payload.email },
    });
    if (!user) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "No account found with the provided credentials.");
    }
    // const matchPassword = await bcryptHelper.comparePassword(
    //   payload.password,
    //   user?.password,
    // );
    const matchPassword = payload.password === user?.password;
    if (!matchPassword) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "No account found with the provided credentials.");
    }
    const tokenInfo = {
        email: user.email,
        userId: user.id,
    };
    const accessToken = await auth_utils_1.jwtHelper.generateToken(tokenInfo, config_1.Config.ACCESS_TOKEN_SECRET, "5D");
    const refreshToken = await auth_utils_1.jwtHelper.generateToken(tokenInfo, config_1.Config.REFRESH_TOKEN_SECRET, "30D");
    return {
        accessToken,
        refreshToken,
    };
};
exports.AuthService = { loginUserToSystemService };
