"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const parseListQuery_1 = require("../../../utils/parseListQuery");
const sendResponse_1 = require("../../../utils/sendResponse");
const approval_service_1 = require("./approval.service");
const getAlApprovalController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await approval_service_1.ApprovalService.getAlApprovalService(user, {
        limit,
        page,
    });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "কোনো অনুমোদনের অনুরোধ পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "অনুমোদনের অনুরোধগুলো সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
exports.ApprovalController = {
    getAlApprovalController,
};
