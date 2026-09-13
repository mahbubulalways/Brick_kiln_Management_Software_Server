"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeLinkController = void 0;
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponse_1 = require("../../../../utils/sendResponse");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const youtube_service_1 = require("./youtube.service");
const createYoutubeLinkController = (0, catchAsync_1.default)(async (req, res) => {
    const payload = req.body;
    const result = await youtube_service_1.YoutubeLinkService.createYoutubeLinkService(payload);
    if (!result) {
        throw new ApplicationError_1.AppError(400, "ইউটিউব লিংক তৈরি করা যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "ইউটিউব লিংক সফলভাবে তৈরি হয়েছে",
        data: result,
    });
});
const getAllYoutubeLinksController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await youtube_service_1.YoutubeLinkService.getAllYoutubeLinksService();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "ইউটিউব লিংকগুলো সফলভাবে পাওয়া গেছে",
        data: result || [],
    });
});
const deleteYoutubeLinkController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await youtube_service_1.YoutubeLinkService.deleteYoutubeLinkService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(404, "ইউটিউব লিংক পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "ইউটিউব লিংক সফলভাবে ডিলিট হয়েছে",
        data: result,
    });
});
exports.YoutubeLinkController = {
    createYoutubeLinkController,
    getAllYoutubeLinksController,
    deleteYoutubeLinkController,
};
