"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const vata_service_1 = require("./vata.service");
const ApplicationError_1 = require("../../errors/ApplicationError");
// GET SUBDOMAIN EXITS OR NOT
const checkSubdomainExistController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await vata_service_1.VataService.checkSubdomainExistService(req.params.id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ডোমেইনটি সফলভাবে যাচাই করা হয়েছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ডোমেইনটি যাচাই করা যায়নি");
    }
});
const getVataInformationController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_service_1.VataService.getVataInformationService(user);
    if (result?.id) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ভাটার তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ভাটার তথ্য পাওয়া যায়নি");
    }
});
// CREATE NEW VATA CONTROLLER
const getMyVataInformationController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_service_1.VataService.getMyVataInformationService(user);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "ভাটার তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ভাটার তথ্য পাওয়া যায়নি");
    }
});
// GET MY NAVBAR FEATURES
const getMyVataNavbarFeaturesController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_service_1.VataService.getMyVataNavbarFeaturesService(user);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "ভাটার তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ভাটার তথ্য পাওয়া যায়নি");
    }
});
// VATA SUBSCRIPTION STATUS
const getVataExpirityController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_service_1.VataService.getVataExpirityService(user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "সাবস্ক্রিপশনের তথ্য সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
exports.VataController = {
    checkSubdomainExistController,
    getVataInformationController,
    getMyVataInformationController,
    getMyVataNavbarFeaturesController,
    getVataExpirityController,
};
