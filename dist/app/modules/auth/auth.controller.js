"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const ApplicationError_1 = require("../../errors/ApplicationError");
const sendResponse_1 = require("../../../utils/sendResponse");
const loginUserToSystemController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const result = await auth_service_1.AuthService.loginUserToSystemService(body);
    if (!result.accessToken) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to login. Please try again later.");
    }
    else {
        res.cookie("token", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: "Login successfully",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: { token: result.accessToken },
        });
    }
});
exports.AuthController = { loginUserToSystemController };
