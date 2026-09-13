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
    const ipAddress = req.ip;
    const result = await auth_service_1.AuthService.loginUserToSystemService(body, ipAddress);
    if (!result?.accessToken) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লগইন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
    }
    else {
        res.cookie("token", result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: "লগইন সফল হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: {
                token: result.accessToken,
            },
        });
    }
});
const logoutController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const ipAddress = req.ip;
    const username = req.user.username;
    const user = req.user;
    const result = await auth_service_1.AuthService.logoutUserService(user, username, ipAddress, body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লগআউট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "আপনি সফলভাবে লগআউট করেছেন।",
    });
});
// CHANGE PASS
const changePasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const result = await auth_service_1.AuthService.changePasswordServie(user, body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পাসওয়ার্ড পরিবর্তন করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
    });
});
exports.AuthController = {
    loginUserToSystemController,
    logoutController,
    changePasswordController,
};
