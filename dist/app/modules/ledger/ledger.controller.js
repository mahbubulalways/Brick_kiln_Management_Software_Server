"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const ledger__service_1 = require("./ledger..service");
// GET LEDGER COUNT
const getLedgerCountController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ledger__service_1.LedgerService.getLedgerCountService();
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "NOT FOUND");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: { count: result },
    });
});
// CREATE NEW LEDGER
const createLedgerController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const result = await ledger__service_1.LedgerService.createLedgerService(body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লেজার তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "লেজার সফলভাবে তৈরি করা হয়েছে।",
        data: result,
    });
});
// GET GROUP OPTION
const getLedgerOptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ledger__service_1.LedgerService.getLedgerOptionService();
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লেজার অপশনের তালিকা পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "লেজার অপশন সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET ALL LEDGER WITH CHILDREN
const getAllLedgerWithController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await ledger__service_1.LedgerService.getAllLedgerWithChildrenService();
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লেজার তালিকা পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "লেজার সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
exports.LedgerController = {
    getLedgerCountController,
    createLedgerController,
    getLedgerOptionController,
    getAllLedgerWithController,
};
