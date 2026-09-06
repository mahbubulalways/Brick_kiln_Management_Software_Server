"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPaymentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../errors/ApplicationError");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const subscription_payment_service_1 = require("./subscription_payment.service");
const sendResponse_1 = require("../../../utils/sendResponse");
// CREATE NEW SUBSCRIPTION PAYMENT
const createNewSubscriptionPaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const body = req.body;
    const result = await subscription_payment_service_1.SubscriptionPaymentService.createNewSubscriptionPaymentService(user, body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "সাবস্ক্রিপশন পেমেন্ট সফলভাবে তৈরি হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "সাবস্ক্রিপশন পেমেন্ট তৈরি করা সম্ভব হয়নি।");
    }
});
// GET ALL PENDING FOR SYSTEM ADMIN
const getAllSubscriptionPaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await subscription_payment_service_1.SubscriptionPaymentService.getAllSubscriptionPaymentService();
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সকল পেন্ডিং সাবস্ক্রিপশন পেমেন্ট পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো পেন্ডিং সাবস্ক্রিপশন পেমেন্ট পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET ALL PAID FOR SYSTEM ADMIN
const getAllPaidSubscriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await subscription_payment_service_1.SubscriptionPaymentService.getAllPaidSubscriptionService();
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সকল পরিশোধিত সাবস্ক্রিপশন পেমেন্ট পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো পরিশোধিত সাবস্ক্রিপশন পেমেন্ট পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET OTHER FOR SYSTEM ADMIN
const getOtherSubscriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await subscription_payment_service_1.SubscriptionPaymentService.getOtherSubscriptionService();
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "অন্যান্য সাবস্ক্রিপশন পেমেন্ট পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো অন্যান্য সাবস্ক্রিপশন পেমেন্ট পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET VATA HISTORY
const getVataSubscriptionPaymentHistoryController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await subscription_payment_service_1.SubscriptionPaymentService.getVataSubscriptionPaymentHistoryService(user);
    if (result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সাবস্ক্রিপশন পেমেন্ট হিস্টোরি পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো সাবস্ক্রিপশন পেমেন্ট হিস্টোরি পাওয়া যায়নি।",
            data: [],
        });
    }
});
// UPDATE SUBSCRIPTION PAYMENT
const updateSubscriptionPaymentControllerStatus = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await subscription_payment_service_1.SubscriptionPaymentService.updateSubscriptionPaymnentStatus(id, body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সাবস্ক্রিপশন পেমেন্ট সফলভাবে আপডেট হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "সাবস্ক্রিপশন পেমেন্টটি পাওয়া যায়নি।");
    }
});
exports.SubscriptionPaymentController = {
    createNewSubscriptionPaymentController,
    getAllSubscriptionPaymentController,
    getAllPaidSubscriptionController,
    getOtherSubscriptionController,
    getVataSubscriptionPaymentHistoryController,
    updateSubscriptionPaymentControllerStatus,
};
