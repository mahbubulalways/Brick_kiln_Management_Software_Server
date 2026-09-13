"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadInfoController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const load_service_1 = require("./load.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../errors/ApplicationError");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// ===============================
// CREATE LOAD INFO
// ===============================
const createLoadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await load_service_1.LoadInfoService.createLoadInfoService(user, seasonId, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "লোডের তথ্য সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্য তৈরি করতে ব্যর্থ হয়েছে");
    }
});
// ===============================
// GET ALL LOAD INFO
// ===============================
const getAllLoadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page, search, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const seasonId = req.seasonId;
    const result = await load_service_1.LoadInfoService.getAllLoadInfoService(user, seasonId, {
        date,
        limit,
        page,
        search,
    });
    if (result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লোডের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: false,
            message: "কোনো লোডের তথ্য পাওয়া যায়নি",
            data: [],
        });
    }
});
// ===============================
// GET SINGLE LOAD INFO
// ===============================
const getSingleLoadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    if (!id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্যের আইডি সঠিক নয়");
    }
    const result = await load_service_1.LoadInfoService.getSingleLoadInfoService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লোডের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্য পাওয়া যায়নি");
    }
});
// ===============================
// UPDATE LOAD INFO
// ===============================
const updateLoadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const seasonId = req.seasonId;
    if (!id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্যের আইডি সঠিক নয়");
    }
    const existing = await load_service_1.LoadInfoService.getSingleLoadInfoService(user, id);
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লোডের তথ্য পাওয়া যায়নি");
    }
    const result = await load_service_1.LoadInfoService.updateLoadInfoService(user, seasonId, id, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লোডের তথ্য সফলভাবে আপডেট হয়েছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্য আপডেট করতে ব্যর্থ হয়েছে");
    }
});
// ===============================
// DELETE LOAD INFO
// ===============================
const deleteLoadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    if (!id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্যের আইডি সঠিক নয়");
    }
    const existing = await load_service_1.LoadInfoService.getSingleLoadInfoService(user, id);
    if (!existing) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লোডের তথ্য পাওয়া যায়নি");
    }
    const result = await load_service_1.LoadInfoService.deleteLoadInfoService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লোডের তথ্য সফলভাবে ডিলেট হয়েছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "লোডের তথ্য ডিলেট করতে ব্যর্থ হয়েছে");
    }
});
// REPORT
const getLoadInfoReportController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await load_service_1.LoadInfoService.getLoadReportService(user, { date });
    if (result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "লোডের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: false,
            message: "কোনো লোডের তথ্য পাওয়া যায়নি",
            data: [],
        });
    }
});
// ===============================
// EXPORT
// ===============================
exports.LoadInfoController = {
    createLoadInfoController,
    getAllLoadInfoController,
    getSingleLoadInfoController,
    updateLoadInfoController,
    deleteLoadInfoController,
    getLoadInfoReportController,
};
