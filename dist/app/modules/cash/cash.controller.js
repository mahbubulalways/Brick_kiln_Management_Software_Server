"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashController = void 0;
const cash_service_1 = require("./cash.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// CREATE CASH
const createCash = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await cash_service_1.CashService.createCashService(user, seasonId, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ক্যাশ সফলভাবে তৈরি হয়েছে",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ক্যাশ তৈরি করা যায়নি");
    }
});
// GET ALL CASH
const getAllCash = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, date, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await cash_service_1.CashService.getAllCashService(user, seasonId, { date, limit, page, search });
    if (result.data.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ক্যাশের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ক্যাশের তথ্য পাওয়া যায়নি",
            data: [],
        });
    }
});
// CASH REPORT
const getAllCashReport = (0, catchAsync_1.default)(async (req, res) => {
    const { date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await cash_service_1.CashService.getCashReportService(user, seasonId, { date });
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ক্যাশের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ক্যাশের তথ্য পাওয়া যায়নি",
            data: [],
        });
    }
});
// GET SINGLE CASH
const getSingleCash = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await cash_service_1.CashService.getSingleCashService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ক্যাশের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ক্যাশের তথ্য পাওয়া যায়নি");
    }
});
// UPDATE CASH
const updateCash = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const existingCash = await cash_service_1.CashService.getSingleCashService(user, id);
    if (!existingCash) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "আপডেট করার জন্য ক্যাশের তথ্য পাওয়া যায়নি",
            data: null,
        });
    }
    else {
        const result = await cash_service_1.CashService.updateCashService(user, id, req.body);
        if (result) {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: 200,
                success: true,
                message: "ক্যাশের তথ্য সফলভাবে আপডেট হয়েছে",
                data: result,
            });
        }
        else {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ক্যাশের তথ্য আপডেট করা যায়নি");
        }
    }
});
// DELETE CASH
const deleteCash = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const existingCash = await cash_service_1.CashService.getSingleCashService(user, id);
    if (!existingCash) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "ডিলিট করার জন্য ক্যাশের তথ্য পাওয়া যায়নি",
        });
    }
    else {
        const result = await cash_service_1.CashService.deleteCashService(user, id);
        if (result) {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: 200,
                success: true,
                message: "ক্যাশের তথ্য সফলভাবে ডিলিট হয়েছে",
                data: result,
            });
        }
        else {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ক্যাশের তথ্য ডিলিট করা যায়নি");
        }
    }
});
exports.CashController = {
    createCash,
    getAllCash,
    getSingleCash,
    updateCash,
    deleteCash,
    getAllCashReport
};
