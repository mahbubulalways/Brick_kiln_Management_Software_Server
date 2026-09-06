"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataCarController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const vata_car_service_1 = require("./vata_car.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
// NEW CAR
const createNewVataCarController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_car_service_1.VataCarService.createNewVataACarService(user, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "গাড়ি সফলভাবে তৈরি হয়েছে",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "গাড়ি তৈরি করা যায়নি");
    }
});
// ALL CAR
const getAllCarController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_car_service_1.VataCarService.getAllVataACarService(user);
    if (result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সকল গাড়ি সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো গাড়ি পাওয়া যায়নি",
            data: [],
        });
    }
});
// SINGLE CAR DELIVERY INCOME
const getSingleCarDeliveryIncomController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await vata_car_service_1.VataCarService.singleCarDeliveryIncomeService(user, req.params.id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "গাড়ির ডেলিভারি আয়ের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ির ডেলিভারি আয়ের কোনো তথ্য পাওয়া যায়নি");
    }
});
exports.VataCarController = {
    createNewVataCarController,
    getAllCarController,
    getSingleCarDeliveryIncomController
};
