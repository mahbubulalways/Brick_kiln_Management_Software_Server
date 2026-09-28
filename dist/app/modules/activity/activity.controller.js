"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const parseListQuery_1 = require("../../../utils/parseListQuery");
const sendResponse_1 = require("../../../utils/sendResponse");
const activity_service_1 = require("./activity.service");
const getAlActivityLogController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await activity_service_1.ActivityService.getAllActivityLogService(user, {
        limit,
        page,
    });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "কোনো অ্যাক্টিভিটি লগ পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "অ্যাক্টিভিটি লগগুলো সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
exports.ActivityLogController = {
    getAlActivityLogController,
};
