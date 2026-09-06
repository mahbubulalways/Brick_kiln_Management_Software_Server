"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodStockController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const sendResponse_1 = require("../../../utils/sendResponse");
const good_stock_service_1 = require("./good_stock.service");
// CREATE GOODS STOCK  CONTROLLER
const createGoodStockController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await good_stock_service_1.GoodStockService.createGoodStockService(req);
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল স্টকে যোগ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "মালামাল সফলভাবে স্টকে যোগ হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
        });
    }
});
// GET ALL 
const getAllGoodStockController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await good_stock_service_1.GoodStockService.getAllGoodStockService(user);
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামাল সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামাল পাওয়া যায়নি।",
            data: [],
        });
    }
});
const getSingleGoodStockController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await good_stock_service_1.GoodStockService.getSingleGoodStockService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল লসের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল লসের তথ্য সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// GET SINGLE FOR UPDATE
const getSingleGoodStockInfoForUpdateController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await good_stock_service_1.GoodStockService.getSingleGoodStockInfoForUpdateService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল লসের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল লসের তথ্য সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// GET OPTIONS 
const getGoodStockOptionsController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await good_stock_service_1.GoodStockService.getGoodStockOptionsService(user);
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামাল সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামাল পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET DEMAGE ITEMS
const getDemageController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await good_stock_service_1.GoodStockService.getDemageGoodService(user);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামাল সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামাল পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET DEMAGE ITEMS
const getLostController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await good_stock_service_1.GoodStockService.getLostGoodService(user);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামাল সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামাল পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET SINGLE GOOD LOSS
const getSingleGoodLossController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await good_stock_service_1.GoodStockService.getSingleGoodLossService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল লসের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল লসের তথ্য সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// UPDATE GOOD LOSS
const updateGoodLossController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const body = req.body;
    const id = req.params.id;
    const result = await good_stock_service_1.GoodStockService.updateGoodLossService(user, id, body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল যোগ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল সফলভাবে যোগ করা হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// DELETE
const deleteGoodStockController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await good_stock_service_1.GoodStockService.deleteGoodStockService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল মুছে ফেলা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল সফলভাবে মুছে ফেলা হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// UPDATE GOOD STOCK
const updateGoodStockController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await good_stock_service_1.GoodStockService.updateGoodStockService(req);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামালের তথ্য আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামালের তথ্য সফলভাবে আপডেট হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
exports.GoodStockController = {
    createGoodStockController,
    getAllGoodStockController,
    getGoodStockOptionsController,
    getDemageController,
    getLostController,
    updateGoodLossController,
    getSingleGoodLossController,
    deleteGoodStockController,
    getSingleGoodStockController,
    getSingleGoodStockInfoForUpdateController,
    updateGoodStockController
};
