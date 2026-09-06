"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodIssueController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const good_issue_service_1 = require("./good_issue.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const parseListQuery_1 = require("../../../utils/parseListQuery");
const createGoodIssueController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await good_issue_service_1.GoodIssueService.createGoodIssueService(req);
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "মালামাল ইস্যু করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "মালামাল সফলভাবে ইস্যু হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
    });
});
// GET ALL 
const getAllGoodIssueController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await good_issue_service_1.GoodIssueService.getAllGoodIssueService(user);
    if (result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামাল সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামাল পাওয়া যায়নি।",
            data: [],
        });
    }
});
// GET SINLE
const getSingleGoodIssueController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await good_issue_service_1.GoodIssueService.getSingleGoodIssueService(user, id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "মালামালের ক্যাটাগরি পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "মালামালের ক্যাটাগরি সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET ISSUE HISTORY
const getGoodIssueHistoryController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await good_issue_service_1.GoodIssueService.getGoodsIssueHistoryLogs(user, { limit, page });
    if (result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "মালামাল সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো মালামাল পাওয়া যায়নি।",
            data: [],
        });
    }
});
exports.GoodIssueController = {
    createGoodIssueController,
    getAllGoodIssueController,
    getSingleGoodIssueController,
    getGoodIssueHistoryController
};
