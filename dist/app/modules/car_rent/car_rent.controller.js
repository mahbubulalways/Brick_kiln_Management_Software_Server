"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../errors/ApplicationError");
const sendResponse_1 = require("../../../utils/sendResponse");
const car_rent_service_1 = require("./car_rent.service");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const parseListQuery_1 = require("../../../utils/parseListQuery");
const createCarRentController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await car_rent_service_1.CarRentService.createCarRentService(user, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে তৈরি হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "গাড়ি ভাড়ার তথ্য তৈরি করা যায়নি।");
    }
});
const getALlCarRentController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await car_rent_service_1.CarRentService.getALlCarRentService(user, { limit, page, search });
    if (result?.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্যসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।",
            data: [],
        });
    }
});
const getSingleCarRentController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await car_rent_service_1.CarRentService.getSingleCarRentService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।");
    }
});
const updateCarRentController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await car_rent_service_1.CarRentService.updateCarRentService(user, id, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে আপডেট হয়েছে।",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "গাড়ি ভাড়ার তথ্য আপডেট করা যায়নি।");
    }
});
const deleteCarRentController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const result = await car_rent_service_1.CarRentService.deleteCarRentService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে ডিলেট করা হয়েছে।",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "গাড়ি ভাড়ার তথ্য ডিলেট করা যায়নি।");
    }
});
exports.CarRentController = {
    createCarRentController,
    getALlCarRentController,
    getSingleCarRentController,
    updateCarRentController,
    deleteCarRentController,
};
