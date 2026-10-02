"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataBackupController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const backup_service_1 = require("./backup.service");
// Create Vata Backup
const createVataBackupController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    if (user?.vataId) {
        const result = await backup_service_1.VataBackupService.createVataBackupService(user);
        if (result) {
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: http_status_codes_1.StatusCodes.OK,
                success: true,
                message: "ভাটার ব্যাকআপ সফলভাবে তৈরি হয়েছে",
                data: result,
            });
        }
        else {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভাটার ব্যাকআপ তৈরি করা যায়নি");
        }
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভাটার তথ্য পাওয়া যায়নি");
    }
});
// Get Vata Backup
const getVataBackupController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    if (user?.vataId) {
        const result = await backup_service_1.VataBackupService.getVataBackupService(user);
        if (result) {
            console.log(result);
            (0, sendResponse_1.sendResponse)(res, {
                statusCode: http_status_codes_1.StatusCodes.OK,
                success: true,
                message: "ভাটার ব্যাকআপ সফলভাবে পাওয়া গেছে",
                data: result,
            });
        }
        else {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো ভাটার ব্যাকআপ পাওয়া যায়নি");
        }
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভাটার তথ্য পাওয়া যায়নি");
    }
});
exports.VataBackupController = {
    createVataBackupController,
    getVataBackupController,
};
