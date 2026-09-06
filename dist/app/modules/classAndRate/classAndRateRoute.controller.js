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
const parseListQuery_1 = require("../../../utils/parseListQuery");
const createClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const result = await classAndRateRoute_service_1.ClassAndRateService.createClassAndRateService(user, body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "শ্রেণী ও রেট যোগ করা যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "শ্রেণী ও রেট সফলভাবে যোগ করা হয়েছে",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        data: result,
    });
});
// GET ALL CLASS AND RATE
const getClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page, } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await classAndRateRoute_service_1.ClassAndRateService.getClassAndRateService(user, { limit, page });
    if (!result.data.length) {
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
    const user = req.user;
    const result = await classAndRateRoute_service_1.ClassAndRateService.getSingleClassAndRateService(user, id);
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
    const user = req.user;
    const result = await classAndRateRoute_service_1.ClassAndRateService.updateClassAndRateService(user, id, body);
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
const deleteClassAndRateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const user = req.user;
    const result = await classAndRateRoute_service_1.ClassAndRateService.deleteClassAndRateService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "দুঃখিত! শ্রেণী ও রেট মুছে ফেলতে ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "শ্রেণী ও রেট সফলভাবে মুছে ফেলা হয়েছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// OPTIONS
const getClassAndRateOptionsController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await classAndRateRoute_service_1.ClassAndRateService.getClassAndRateOptionsService(user);
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
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
exports.ClassAndRateController = {
    createClassAndRateController,
    getClassAndRateController,
    getSingleClassAndRateController,
    updateClassAndRateController,
    deleteClassAndRateController,
    getClassAndRateOptionsController
};
