"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const ApplicationError_1 = require("../errors/ApplicationError");
const config_1 = require("../../config");
const prisma_1 = require("../../helpers/prisma");
const auth_utils_1 = require("../modules/auth/auth.utils");
const AuthGuard = (...roles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const token = req?.headers?.authorization?.split(" ")[1];
        if (!token) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized access. You must be logged in to continue.");
        }
        const token_info = (await auth_utils_1.jwtHelper.verifyToken(token, config_1.Config.ACCESS_TOKEN_SECRET));
        if (!token_info) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Unauthorized access. You must be logged in to continue.");
        }
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                username: token_info.username,
                role: token_info?.role,
            }, select: {
                id: true,
                isDeleted: true,
                username: true,
                role: true
            }
        });
        if (!user?.id) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Unauthorized access. You must be logged in to continue.");
        }
        if (user.isDeleted) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Your account has been deleted. Please contact support if you think this is a mistake.");
        }
        if (roles.length && !roles.includes(token_info.role)) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "Access forbidden. You do not have the required permissions to perform this action.");
        }
        req.user = token_info;
        next();
    });
};
exports.default = AuthGuard;
