"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassAndRateController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const classAndRateRoute_service_1 = require("./classAndRateRoute.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const createClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const result = await classAndRateRoute_service_1.ClassAndRateService.createClassAndRateService(body);
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to create Class & Rate");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "শ্রেণী সফলভাবে এড হয়েছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET ALL CLASS AND RATE
const getClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await classAndRateRoute_service_1.ClassAndRateService.getClassAndRateService();
    if (!result.length) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "শ্রেণী ও রেট সফলভাবে পাওয়া গেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET SINGLE CLASS AND RATE
const getSingleClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const result = await classAndRateRoute_service_1.ClassAndRateService.getSingleClassAndRateService(Number(id));
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "শ্রেণী ও রেট সফলভাবে পাওয়া গেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// Update CLASS AND RATE
const updateClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const body = req.body;
    const result = await classAndRateRoute_service_1.ClassAndRateService.updateClassAndRateService(Number(id), body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "দুঃখিত! শ্রেণী ও রেট আপডেট করতে ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "শ্রেণী ও রেট সফলভাবে আপডেট হয়েছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
exports.ClassAndRateController = {
    createClassAndRateController,
    getClassAndRateController,
    getSingleClassAndRateController,
    updateClassAndRateController,
};
//# sourceMappingURL=classAndRateRoute.controller.js.map