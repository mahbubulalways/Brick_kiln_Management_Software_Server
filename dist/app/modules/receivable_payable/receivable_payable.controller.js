"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceivablePayableController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const receivable_payable_service_1 = require("./receivable_payable.service");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
// ==========================================
// Create Receivable / Payable
// ==========================================
const createReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.createReceivablePayable(user, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে তৈরি হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "সঠিক transactionType প্রদান করুন।");
    }
});
// ==========================================
// Create Transaction
// ==========================================
const createTransactionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.createTransaction(user, id, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "লেনদেন সফলভাবে তৈরি হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লেনদেন তৈরি করা যায়নি।");
    }
});
// ==========================================
// Get All Receivable / Payable
// ==========================================
const getAllReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.getAllReceivablePayable(user);
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লেনদেনের হিসাবসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো লেনদেনের হিসাব পাওয়া যায়নি।",
            data: [],
        });
    }
});
// ==========================================
// Get Single Receivable / Payable
// ==========================================
const getSingleReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.getSingleReceivablePayable(user, req.params.id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লেনদেনের হিসাব পাওয়া যায়নি।");
    }
});
// ==========================================
// Update Receivable / Payable
// ==========================================
const updateReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.updateReceivablePayable(user, req.params.id, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে আপডেট হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লেনদেনের হিসাব পাওয়া যায়নি বা আপডেট করা যায়নি।");
    }
});
// ==========================================
// Delete Receivable / Payable
// ==========================================
const deleteReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.deleteReceivablePayable(user, req.params.id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে মুছে ফেলা হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লেনদেনের হিসাব পাওয়া যায়নি বা মুছে ফেলা যায়নি।");
    }
});
// ==========================================
// Get Current Amount
// ==========================================
const getCurrentAmountController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await receivable_payable_service_1.ReceivablePayableService.getCurrentAmountService(user, req.params.id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "বর্তমান বকেয়া পরিমাণ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লেনদেনের হিসাব বা বর্তমান বকেয়া পরিমাণ পাওয়া যায়নি।");
    }
});
// ==========================================
// Export Controller
// ==========================================
exports.ReceivablePayableController = {
    createReceivablePayableController,
    createTransactionController,
    getAllReceivablePayableController,
    getSingleReceivablePayableController,
    updateReceivablePayableController,
    deleteReceivablePayableController,
    getCurrentAmountController,
};
