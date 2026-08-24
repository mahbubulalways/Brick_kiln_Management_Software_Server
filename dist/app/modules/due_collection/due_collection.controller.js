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
const parseListQuery_1 = require("../../../utils/parseListQuery");
const getDueOfCustomerController = (0, catchAsync_1.default)(async (req, res) => {
    const customerId = req.params.customerId;
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.getDueOfCustomerService(user, customerId);
    if (!result?.id) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "সফলভাবে পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: {},
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
//INSERT NEW DUE
const collectionNewDueController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.collectDueService(user, req.body);
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
    const user = req.user;
    const { limit, page, date, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await due_collection_service_1.DueCollectionService.todayPayDueService(user, { date, limit, page, search });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের  জন্য কোনো বাকি পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের বাকি সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// TODAY PAID
const getTodaysDuePaidController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await due_collection_service_1.DueCollectionService.getTodaysDuePaidService(user, { date, limit, page });
    if (!result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের  জন্য কোনো বাকি পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের বাকি সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
const getAllDueListController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, search, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.getAllDueListService(user, { date, limit, page, search });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "বাকি পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: " বাকি সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET SINGKE
const getSingleDueCollectionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.getSingleDueCollectionService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "NOT FOUND");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET SINGLE DUE ONLY DATE
const getSingleDueCollectionDateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.getSingleDueCollectionDateService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "NOT FOUND");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// UPDATE DUE COLLECTION
const updateDueCollectionController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.updateDueCollectionService(user, id, body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেট করতে ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "সফলভাবে আপডেট করেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// UPDATE DUE COLLECTION DATE
const updateDueCollectionDateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const user = req.user;
    const result = await due_collection_service_1.DueCollectionService.upDateDueCollectionDateService(user, id, body);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেট করতে ব্যর্থ হয়েছে");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "সফলভাবে আপডেট করেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
exports.DueCollectionController = {
    collectionNewDueController,
    getDueOfCustomerController,
    todayPayDueController,
    getTodaysDuePaidController,
    getAllDueListController,
    getSingleDueCollectionController,
    updateDueCollectionController,
    updateDueCollectionDateController,
    getSingleDueCollectionDateController
};
