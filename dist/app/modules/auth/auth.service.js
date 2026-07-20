"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../config");
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const auth_utils_1 = require("./auth.utils");
const loginUserToSystemService = async (payload) => {
    // const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.auth);
    //  where: isEmail ? { email: payload.auth } : { phone: payload.auth },
    const user = await prisma_1.default.user.findFirst({
        where: { email: payload.email },
    });
    console.log(user);
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
// const res = await prisma.user.create({
//   data: { email: "admin@gmail.com", password: "12345678" },
// });
// console.log(res);
//# sourceMappingURL=auth.service.js.map