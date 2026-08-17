"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const report_service_1 = require("./report.service");
const getAllCustomertController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await report_service_1.ReportService.getTopSellingAreasService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো বিক্রয় তথ্য পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "এলাকাভিত্তিক বিক্রয় তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
exports.ReportController = {
    getAllCustomertController
};
