"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodRefundController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const good_refund_service_1 = require("./good_refund.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const createGoodIssueRefundController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await good_refund_service_1.GoodRefundService.createRefundGoodService(req);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল ফেরত নেওয়া সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল সফলভাবে ফেরত নেওয়া হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
    });
});
exports.GoodRefundController = {
    createGoodIssueRefundController
};
