"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpLineController = void 0;
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponse_1 = require("../../../../utils/sendResponse");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const helpline_service_1 = require("./helpline.service");
const createOrUpdateHelplineController = (0, catchAsync_1.default)(async (req, res) => {
    const payload = req.body;
    const result = await helpline_service_1.HelpLineService.createOrUpdateHelplineService(payload);
    if (!result) {
        throw new ApplicationError_1.AppError(400, "হেল্পলাইন তথ্য সংরক্ষণ করা যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "হেল্পলাইন তথ্য সফলভাবে সংরক্ষণ করা হয়েছে",
        data: result,
    });
});
const getHelplineController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await helpline_service_1.HelpLineService.getHelplineService();
    if (!result) {
        throw new ApplicationError_1.AppError(404, "হেল্পলাইন তথ্য পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "হেল্পলাইন তথ্য পাওয়া গেছে",
        data: result,
    });
});
exports.HelpLineController = {
    createOrUpdateHelplineController,
    getHelplineController,
};
