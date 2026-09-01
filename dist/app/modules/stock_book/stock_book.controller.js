"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockBookController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const stock_book_service_1 = require("./stock_book.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// CREATE STOCK BOOK CONTROLLER
const createStockBookController = (0, catchAsync_1.default)(async (req, res) => {
    const { body } = req;
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await stock_book_service_1.StockBookService.createStockBookService(user, seasonId, body);
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "স্টক বুক তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "স্টক বুক সফলভাবে তৈরি হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            data: result,
        });
    }
});
// GET ALL STOCK
const getAllStockController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const seasonId = req.seasonId;
    const user = req.user;
    const result = await stock_book_service_1.StockBookService.getAllStockService(user, seasonId, { limit, page });
    if (!result.data.length) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো স্টকের তথ্য পাওয়া যায়নি।",
            data: [],
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "স্টকের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// DELETE
const deleteStockBookController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await stock_book_service_1.StockBookService.deleteStockService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "স্টকের তথ্য ডিলেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "স্টকের তথ্য সফলভাবে ডিলেট হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
        });
    }
});
exports.StockBookController = {
    createStockBookController,
    getAllStockController,
    deleteStockBookController
};
