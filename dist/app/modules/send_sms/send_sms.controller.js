"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsSendController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const send_sms_service_1 = require("./send_sms.service");
const getVatasSendMessageController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await send_sms_service_1.SendSmsService.getVatasSendMessageService(user);
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো SMS বার্তা পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "SMS বার্তাগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
exports.SmsSendController = {
    getVatasSendMessageController,
};
