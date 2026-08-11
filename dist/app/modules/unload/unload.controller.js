"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnloadController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const unload_service_1 = require("./unload.service");
const ApplicationError_1 = require("../../errors/ApplicationError");
const createUnloadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await unload_service_1.UnloadService.createNewUnloadService(req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "আনলোডের তথ্য সফলভাবে তৈরি হয়েছে",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আনলোডের তথ্য তৈরি করতে ব্যর্থ হয়েছে");
    }
});
// GET ALL UNLOAD
const getAllUnloadInfoController = (0, catchAsync_1.default)(async (req, res) => {
    // const { limit, page, search, date } = await parseListQuery(req.query); { date, limit, page, search }
    const result = await unload_service_1.UnloadService.getAllUnloadService();
    if (result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "আনলোডের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: false,
            message: "কোনো আনলোডের তথ্য পাওয়া যায়নি",
            data: [],
        });
    }
});
exports.UnloadController = {
    createUnloadInfoController,
    getAllUnloadInfoController
};
