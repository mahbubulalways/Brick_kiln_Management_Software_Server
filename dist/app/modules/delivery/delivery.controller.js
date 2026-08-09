"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const parseListQuery_1 = require("../../../utils/parseListQuery");
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const delivery_service_1 = require("./delivery.service");
const http_status_codes_1 = require("http-status-codes");
const getNextDeliveryNoController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await delivery_service_1.DeliveryService.getNextDeliveryNo();
    (0, sendResponse_1.sendResponse)(res, {
        message: "সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// GET DELIVERY THAT GO TODAY
const getDeliveryThatGoTodayController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, date, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await delivery_service_1.DeliveryService.getDeliveryThatGoTodayService({ date, limit, page, search });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের ডেলিভারি পাওয়া গেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
const getAllDeliveryListController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, date, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await delivery_service_1.DeliveryService.getAllDeliveryListService({ date, limit, page, search });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "কোনো ডেলিভারি পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "ডেলিভারি সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
const createDeliveryController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const result = await delivery_service_1.DeliveryService.createDeliveryService(body);
    (0, sendResponse_1.sendResponse)(res, {
        message: result?.id
            ? "ডেলিভারি সফলভাবে তৈরি করা হয়েছে।"
            : "ডেলিভারি তৈরি করা সম্ভব হয়নি।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: !!result?.id,
        data: result,
    });
});
const getTodaysDeliveryThatDoneController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await delivery_service_1.DeliveryService.getTodaysDeliveryThatDone({ date, limit, page });
    if (!result?.data?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "আজকের ডেলিভারি পাওয়া গেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET SINGLE
const getSingleDeliveryController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await delivery_service_1.DeliveryService.getSingleDeliveryService(Number(id));
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো ডেলিভারি পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "ডেলিভারি পাওয়া গেছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
exports.DeliveryController = {
    getNextDeliveryNoController,
    getDeliveryThatGoTodayController,
    createDeliveryController,
    getTodaysDeliveryThatDoneController,
    getAllDeliveryListController,
    getSingleDeliveryController,
};
