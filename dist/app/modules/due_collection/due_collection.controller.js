"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueCollectionController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const due_collection_service_1 = require("./due_collection.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const getDueOfCustomerController = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.params.customerId;
    const result = await due_collection_service_1.DueCollectionService.getDueOfCustomerService(Number(customerId));
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "NOT FOUND");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
//INSERT NEW DUE
const collectionNewDueController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await due_collection_service_1.DueCollectionService.collectDueService(req.body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "বাকি জমা করতে ব্যর্থ হয়েছে।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "বাকি জমা সফলভাবে তৈরি হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// TODAY HAVE PAY
const todayPayDueController = (0, catchAsync_1.default)(async (req, res) => {
    const { date } = req.query;
    console.log(date);
    if (!date || typeof date !== "string") {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "তারিখ প্রদান করা হয়নি বা তারিখের ফরম্যাট সঠিক নয়।");
    }
    const result = await due_collection_service_1.DueCollectionService.todayPayDueService(date);
    (0, sendResponse_1.sendResponse)(res, {
        message: result?.length
            ? "আজকের বাকি সফলভাবে পাওয়া গেছে।"
            : "আজকের  জন্য কোনো বাকি পাওয়া যায়নি।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// TODAY PAID
const getTodaysDuePaidController = (0, catchAsync_1.default)(async (req, res) => {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "তারিখ প্রদান করা হয়নি বা তারিখের ফরম্যাট সঠিক নয়।");
    }
    const result = await due_collection_service_1.DueCollectionService.getTodaysDuePaidService(date);
    (0, sendResponse_1.sendResponse)(res, {
        message: result?.length
            ? "আজকের বাকি সফলভাবে পাওয়া গেছে।"
            : "আজকের  জন্য কোনো বাকি পাওয়া যায়নি।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
const getAllDueListController = (0, catchAsync_1.default)(async (req, res) => {
    const { startDate, endDate } = req.query;
    const result = await due_collection_service_1.DueCollectionService.getAllDueListService(startDate, endDate);
    (0, sendResponse_1.sendResponse)(res, {
        message: result?.length
            ? " বাকি সফলভাবে পাওয়া গেছে।"
            : "বাকি পাওয়া যায়নি।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// GET SINGKE
const getSingleDueCollectionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await due_collection_service_1.DueCollectionService.getSingleDueCollectionService(Number(id));
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "NOT FOUND");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
//
const updateDueCollectionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const result = await due_collection_service_1.DueCollectionService.updateDueCollectionService(Number(id), body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেট করতে ব্যর্থ হয়েছে");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "সফলভাবে আপডেট করেছে",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
exports.DueCollectionController = {
    collectionNewDueController,
    getDueOfCustomerController,
    todayPayDueController,
    getTodaysDuePaidController,
    getAllDueListController,
    getSingleDueCollectionController,
    updateDueCollectionController,
};
