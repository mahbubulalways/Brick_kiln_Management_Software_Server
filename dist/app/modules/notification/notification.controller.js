"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const parseListQuery_1 = require("../../../utils/parseListQuery");
const sendResponse_1 = require("../../../utils/sendResponse");
const notification_service_1 = require("./notification.service");
const getAllNotification = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const seasonId = req.seasonId;
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await notification_service_1.NotificationService.getAllNotification(user, seasonId, {
        limit,
        page,
    });
    if (result.data.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "নোটিফিকেশন সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো নোটিফিকেশন পাওয়া যায়নি",
            data: [],
        });
    }
});
const getUnreadNotificationsNumber = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await notification_service_1.NotificationService.getUnreadNotificationsNumber(user, seasonId);
    if (result > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "অপঠিত নোটিফিকেশনের সংখ্যা পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো অপঠিত নোটিফিকেশন নেই",
            data: 0,
        });
    }
});
const updateNotification = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await notification_service_1.NotificationService.updateNotification(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: result.isRead
                ? "নোটিফিকেশন পড়া হয়েছে"
                : "নোটিফিকেশন অপঠিত করা হয়েছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "নোটিফিকেশন পাওয়া যায়নি",
            data: [],
        });
    }
});
exports.NotificationController = {
    getAllNotification,
    updateNotification,
    getUnreadNotificationsNumber,
};
