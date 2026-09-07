"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataSmsSettingsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const vata_sms_sittings_service_1 = require("./vata_sms_sittings.service");
const createOrUpdateVataSmsController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_sms_sittings_service_1.VataSmsSettingsService.createOrUpdateVataSmsSettings(user, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "SMS সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "SMS সেটিংস সংরক্ষণ করা যায়নি");
    }
});
const getVataSmsSettingController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_sms_sittings_service_1.VataSmsSettingsService.getVataSmsSettingService(user);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "SMS সেটিংসের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "SMS সেটিংসের কোনো তথ্য পাওয়া যায়নি");
    }
});
exports.VataSmsSettingsController = {
    createOrUpdateVataSmsController,
    getVataSmsSettingController,
};
