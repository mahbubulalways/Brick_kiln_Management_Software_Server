"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const ApplicationError_1 = require("../../../errors/ApplicationError");
const subscription_service_1 = require("./subscription.service");
const sendResponse_1 = require("../../../../utils/sendResponse");
// CREATE SUBSCRIPTION PLAN
const createSubscriptionPlanController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await subscription_service_1.SubscriptionService.createSubscriptionPlanService(req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "সাবস্ক্রিপশন প্ল্যান তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে তৈরি হয়েছে।",
    });
});
// GET ALL SUBSCRIPTIONS
const getAllPaymentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await subscription_service_1.SubscriptionService.getAllSubscriptionPlanService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সাবস্ক্রিপশন প্ল্যানগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET ALL SUBSCRIPTIONS OPTIONS
const getAllSubscriptionPlanOptionsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await subscription_service_1.SubscriptionService.getAllSubscriptionPlanOptionsService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সাবস্ক্রিপশন প্ল্যানগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET SINGLE SUBSCRIPTION
const getSingleSubscriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await subscription_service_1.SubscriptionService.getSingleSubscriptionPlanService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET VATA'S RUNNING  SUBSCRIPTION
const getSingleVataSubscriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await subscription_service_1.SubscriptionService.getSingleVataSubscriptionService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// UPDATE SINGLE SUBSCRIPTION
const updateSubscriptionController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await subscription_service_1.SubscriptionService.updateSubscriptionPlanService(id, payload);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "সাবস্ক্রিপশন প্ল্যানটি পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে আপডেট হয়েছে।",
        data: result,
    });
});
exports.SubscriptionController = {
    createSubscriptionPlanController,
    getAllPaymentController,
    getAllSubscriptionPlanOptionsController,
    getSingleSubscriptionController,
    updateSubscriptionController,
    getSingleVataSubscriptionController
};
