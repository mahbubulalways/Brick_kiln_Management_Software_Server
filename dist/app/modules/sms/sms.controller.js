"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const sms_service_1 = require("./sms.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// POST
const purchaseManualSmsController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await sms_service_1.SmsService.purchaseManualSmsService(user, req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "SMS রেট সংরক্ষণ করা সম্ভব হয়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS রেট সফলভাবে সংরক্ষণ করা হয়েছে।",
            data: result,
        });
    }
});
// GET
const getMyVatarSmsReportController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await sms_service_1.SmsService.getMyVatarSmsReportService(user);
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো SMS রিপোর্ট পাওয়া যায়নি।",
            data: {},
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS রিপোর্ট সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET VATAR INFO PAYMENT
const getSmspurchaseHistroyController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await sms_service_1.SmsService.getSmspurchaseHistroyService(user, {
        limit,
        page,
    });
    if (!result || result.data.length === 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো SMS ক্রয়ের ইতিহাস পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS ক্রয়ের ইতিহাস সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET MANUAL REQUEST
const getManualSmspurchaseRequestController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await sms_service_1.SmsService.getManualSmspurchaseRequestService({
        limit,
        page,
    });
    if (!result || result.data.length === 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো ম্যানুয়াল SMS ক্রয়ের অনুরোধ পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ম্যানুয়াল SMS ক্রয়ের অনুরোধগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET ALL MESSAGE PURCHASE HISTORY
const getAllSmspurchaseHistoryController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await sms_service_1.SmsService.getAllSmspurchaseHistoryService({
        limit,
        page,
    });
    if (!result || result.data.length === 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো SMS ক্রয়ের ইতিহাস পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সকল SMS ক্রয়ের ইতিহাস সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// UPDATE SMS PAYMENT STATUS
const updateSmsPaymentStatusController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sms_service_1.SmsService.updateSmsPaymentStatusService(req.params.id, req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "SMS পেমেন্টের স্ট্যাটাস আপডেট করা সম্ভব হয়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS পেমেন্টের স্ট্যাটাস সফলভাবে আপডেট হয়েছে।",
            data: result,
        });
    }
});
exports.SmsController = {
    purchaseManualSmsController,
    getMyVatarSmsReportController,
    getSmspurchaseHistroyController,
    getManualSmspurchaseRequestController,
    getAllSmspurchaseHistoryController,
    updateSmsPaymentStatusController,
};
