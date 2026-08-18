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
    const result = await receivable_payable_service_1.ReceivablePayableService.createReceivablePayable(req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "সঠিক transactionType প্রদান করুন");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "লেনদেনের হিসাব সফলভাবে তৈরি হয়েছে",
        data: result,
    });
});
// ==========================================
// Create Transaction
// ==========================================
const createTransactionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await receivable_payable_service_1.ReceivablePayableService.createTransaction(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "লেনদেনের হিসাব সফলভাবে তৈরি হয়েছে",
        data: result,
    });
});
// ==========================================
// Get All 
// ==========================================
const getAllReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await receivable_payable_service_1.ReceivablePayableService.getAllReceivablePayable();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো লেনদেনের হিসাব পাওয়া যায়নি",
            data: result,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "দেওয়া লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
// ==========================================
// Get Single Receivable / Payable
// ==========================================
const getSingleReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await receivable_payable_service_1.ReceivablePayableService.getSingleReceivablePayable(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
// ==========================================
// Update Receivable / Payable
// ==========================================
const updateReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await receivable_payable_service_1.ReceivablePayableService.updateReceivablePayable(req.params.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "লেনদেনের হিসাব সফলভাবে আপডেট হয়েছে",
        data: result,
    });
});
// ==========================================
// Delete Receivable / Payable
// ==========================================
const deleteReceivablePayableController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await receivable_payable_service_1.ReceivablePayableService.deleteReceivablePayable(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "লেনদেনের হিসাব সফলভাবে মুছে ফেলা হয়েছে",
        data: result,
    });
});
// GET CURENT AMOUN
const getCurrentAmountController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await receivable_payable_service_1.ReceivablePayableService.getCurrentAmountService(req.params.id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো লেনদেনের হিসাব পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
exports.ReceivablePayableController = {
    createReceivablePayableController,
    createTransactionController,
    getAllReceivablePayableController,
    getSingleReceivablePayableController,
    updateReceivablePayableController,
    deleteReceivablePayableController,
    getCurrentAmountController
};
// const getAllGivenController = catchAsync(
//     async (req: Request, res: Response) => {
//         const result =
//             await ReceivablePayableService.getAllGivenService();
//         if (!result.length) {
//             throw new AppError(
//                 StatusCodes.NOT_FOUND,
//                 "কোনো লেনদেনের হিসাব পাওয়া যায়নি"
//             );
//         }
//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "দেওয়া লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
//             data: result,
//         });
//     }
// );
// // ==========================================
// // Get All TAKEN
// // ==========================================
// const getAllTakenController = catchAsync(
//     async (req: Request, res: Response) => {
//         const result =
//             await ReceivablePayableService.getAllTakenService();
//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "নেওয়া লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
//             data: result,
//         });
//     }
// );
