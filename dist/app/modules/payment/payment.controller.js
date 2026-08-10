"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const payment_service_1 = require("./payment.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// CREATE NEW LEDGER
const createPaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.createPaymentService(req);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পেমেন্ট তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "পেমেন্ট সফলভাবে তৈরি করা হয়েছে।",
        });
    }
});
// GET ALL PAYMENT PAGINATE AND SEARCH
const getAllPaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, search, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await payment_service_1.PaymentService.getAllPaymentService({
        limit,
        page,
        search,
        date,
    });
    if (!result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো পেমেন্ট পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "পেমেন্টগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
//
// GET ALL PAYMENT PAGINATE AND SEARCH
const paymentReportViaGroupController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.paymentReportViaGroupService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো পেমেন্ট পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "পেমেন্টগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET SINGLE PAYMENT
const getSinglePaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await payment_service_1.PaymentService.getSinglePaymentService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো পেমেন্ট পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "পেমেন্ট সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// UPDATE PAYMENT
const updatePaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentService.updatePaymentService(req);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পেমেন্ট আপডেট করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "পেমেন্ট সফলভাবে আপডেট করা হয়েছে।",
        });
    }
});
// DELETE PAYMENT (SOFT)
const deletePaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await payment_service_1.PaymentService.deletePaymentServie(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "পেমেন্ট মুছে ফেলা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "পেমেন্ট সফলভাবে মুছে ফেলা হয়েছে।",
        });
    }
});
exports.PaymentController = {
    createPaymentController,
    getAllPaymentController,
    paymentReportViaGroupController,
    getSinglePaymentController,
    updatePaymentController,
    deletePaymentController
};
