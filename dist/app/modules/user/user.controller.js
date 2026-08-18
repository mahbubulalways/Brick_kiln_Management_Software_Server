"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const parseListQuery_1 = require("../../../utils/parseListQuery");
const createUserController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.createUserServie(req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ইউজার তৈরি করা যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "ইউজার সফলভাবে তৈরি হয়েছে।",
        data: result,
    });
});
// Get All Users
const getAllUsersController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getAllUsersService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ইউজার খুঁজে পাওয়া যায়নি।",
            data: [],
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "সকল ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// Get Single User
const getSingleUserController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getSingleUserService(req.params.id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইউজার খুঁজে পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// Update User
const updateUserController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.updateUserService(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ইউজারের তথ্য সফলভাবে আপডেট হয়েছে।",
        data: result,
    });
});
// Delete User
const deleteUserController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.deleteUserService(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ইউজার সফলভাবে মুছে ফেলা হয়েছে।",
        data: result,
    });
});
const getUserHistoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await user_service_1.UserService.getUserLoginHistoryService({ page, limit });
    if (!result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ইউজার খুঁজে পাওয়া যায়নি।",
            data: [],
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "সকল ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
const getUserOptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.getUserOptionService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ইউজার খুঁজে পাওয়া যায়নি।",
            data: [],
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "সকল ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
exports.UserController = {
    createUserController,
    getAllUsersController,
    getSingleUserController,
    updateUserController,
    deleteUserController,
    getUserHistoryController,
    getUserOptionController
};
