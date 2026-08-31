"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVataController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponse_1 = require("../../../../utils/sendResponse");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const vata_service_1 = require("./vata.service");
// CREATE NEW VATA CONTROLLER
const createNewVataController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vata_service_1.AdminVataService.createNewVataService(req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "ভাটা সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভাটা তৈরি করা যায়নি");
    }
});
// GET ALL VATA
const getAllVataController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vata_service_1.AdminVataService.getAllVataService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো ভাটা পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ভাটাগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET INACTIVE VATA
const getInactiveVataController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vata_service_1.AdminVataService.getAllInactiveVataService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো ভাটা পাওয়া যায়নি।",
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ভাটাগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET SINGLE VATA
const getSingleVataController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await vata_service_1.AdminVataService.getSingleVataService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো ভাটা পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ভাটা সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
exports.AdminVataController = {
    createNewVataController,
    getAllVataController,
    getSingleVataController,
    getInactiveVataController
};
