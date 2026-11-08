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
    const user = req.user;
    const result = await auth_service_1.AuthService.logoutUserService(user, body);
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
// FORGOT PASS
const forgotPasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.forgotPasswordService(req.body.email);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "রিকভারি কোড পাঠানো যায়নি");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "আপনার ইমেইলে পাসওয়ার্ড পুনরুদ্ধার কোড পাঠানো হয়েছে",
        });
    }
});
// Resend Recovery Code Controller
const resendRecoveryCodeController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.resendRecoveryCodeService(req.body.email);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "নতুন কোড পাঠানো যায়নি");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "নতুন পুনরুদ্ধার কোড আপনার ইমেইলে পাঠানো হয়েছে",
        });
    }
});
// Verify Recovery Code Controller
const verifyRecoveryCodeController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.verifyRecoveryCodeService(req.body.email, req.body.recoveryCode);
    if (!result.verified) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভেরিফিকেশন ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ভেরিফিকেশন সফল হয়েছে",
        });
    }
});
// RESET PASSWORD
const resetPasswordController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.resetPasswordService(req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পাসওয়ার্ড পরিবর্তন করা যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
    });
});
exports.AuthController = {
    loginUserToSystemController,
    logoutController,
    changePasswordController,
    forgotPasswordController,
    resendRecoveryCodeController,
    verifyRecoveryCodeController,
    resetPasswordController,
};
