"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsRateController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sms_rate_service_1 = require("./sms_rate.service");
const sendResponse_1 = require("../../../../utils/sendResponse");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const createOrUpdateSmsRateController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sms_rate_service_1.SmsRateService.createOrUpdateSmsRateService(req.body);
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
const getSmsRateController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sms_rate_service_1.SmsRateService.getSmsRateService();
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS রেটের তথ্য পাওয়া যায়নি।",
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS রেট সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
exports.SmsRateController = {
    getSmsRateController,
    createOrUpdateSmsRateController,
};
