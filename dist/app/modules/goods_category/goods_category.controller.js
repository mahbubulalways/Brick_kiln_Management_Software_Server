"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodCategoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const goods_category_service_1 = require("./goods_category.service");
const sendResponse_1 = require("../../../utils/sendResponse");
// CREATE GOODS STOCK  CATEGORY CONTROLLER
const createGoodStockController = (0, catchAsync_1.default)(async (req, res) => {
    const { body } = req;
    const user = req.user;
    const result = await goods_category_service_1.GoodsCategoryService.createGoodCategoryService(user, body);
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামালের ক্যাটাগরি তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "মালামালের ক্যাটাগরি সফলভাবে তৈরি হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
        });
    }
});
const getAllGoodCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await goods_category_service_1.GoodsCategoryService.getGoodCategoryService(user);
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামালের ক্যাটাগরিসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামালের ক্যাটাগরি পাওয়া যায়নি।",
            data: [],
        });
    }
});
const getGoodCategoryOptionsController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await goods_category_service_1.GoodsCategoryService.getGoodCategoryService(user);
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামালের ক্যাটাগরিসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামালের ক্যাটাগরি পাওয়া যায়নি।",
            data: [],
        });
    }
});
const getSingleGoodCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await goods_category_service_1.GoodsCategoryService.getSingleGoodCategoryService(user, id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "মালামালের ক্যাটাগরি পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "মালামালের ক্যাটাগরি সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
const updateGoodCategoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const user = req.user;
    const result = await goods_category_service_1.GoodsCategoryService.updateGoodCategoryService(user, id, body);
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামালের ক্যাটাগরি আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "মালামালের ক্যাটাগরি সফলভাবে আপডেট হয়েছে।",
        data: result,
    });
});
exports.GoodCategoryController = {
    createGoodStockController,
    getAllGoodCategoryController,
    getSingleGoodCategoryController,
    updateGoodCategoryController,
    getGoodCategoryOptionsController
};
