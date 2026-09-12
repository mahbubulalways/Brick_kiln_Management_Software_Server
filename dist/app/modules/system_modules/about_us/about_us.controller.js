"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUsController = void 0;
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponse_1 = require("../../../../utils/sendResponse");
const about_us_service_1 = require("./about_us.service");
const createAboutUsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await about_us_service_1.AboutUsService.createAboutUsService(req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "আমাদের সম্পর্কে তথ্য সফলভাবে সংরক্ষণ করা হয়েছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "আমাদের সম্পর্কে তথ্য সংরক্ষণ করা যায়নি",
            data: null,
        });
    }
});
const getAboutUsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await about_us_service_1.AboutUsService.getAboutUsService();
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "আমাদের সম্পর্কে তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "আমাদের সম্পর্কে কোনো তথ্য পাওয়া যায়নি",
            data: null,
        });
    }
});
exports.AboutUsController = {
    createAboutUsController,
    getAboutUsController,
};
