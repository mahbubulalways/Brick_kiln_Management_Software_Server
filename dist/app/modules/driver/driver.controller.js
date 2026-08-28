"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const parseListQuery_1 = require("../../../utils/parseListQuery");
const sendResponse_1 = require("../../../utils/sendResponse");
const driver_service_1 = require("./driver.service");
// ড্রাইভার তৈরি
const createDriverController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await driver_service_1.DriverService.createDriverService(user, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "ড্রাইভার সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "ড্রাইভার তৈরি করা যায়নি",
            data: null,
        });
    }
});
// সকল ড্রাইভার পাওয়া
const getAllDriversController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { limit, page, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await driver_service_1.DriverService.getAllDriversService(user, { limit, page, search });
    if (result && result.data.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "সকল ড্রাইভার সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ড্রাইভার পাওয়া যায়নি",
            data: [],
        });
    }
});
// নির্দিষ্ট ড্রাইভার পাওয়া
const getSingleDriverController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await driver_service_1.DriverService.getSingleDriverService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ড্রাইভারের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "ড্রাইভার খুঁজে পাওয়া যায়নি",
            data: null,
        });
    }
});
// ড্রাইভার আপডেট
const updateDriverController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await driver_service_1.DriverService.updateDriverService(user, id, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ড্রাইভারের তথ্য সফলভাবে আপডেট হয়েছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "ড্রাইভার খুঁজে পাওয়া যায়নি",
            data: null,
        });
    }
});
// ড্রাইভার ডিলিট
const deleteDriverController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await driver_service_1.DriverService.deleteDriverService(user, id);
    if (result === null) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ড্রাইভার সফলভাবে মুছে ফেলা হয়েছে",
            data: null,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "ড্রাইভার মুছে ফেলা যায়নি",
            data: null,
        });
    }
});
// GET OPTIONS
const driverOptionsForDeliverController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await driver_service_1.DriverService.driverOptionsForDeliveryService(user);
    if (result && result.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "সকল ড্রাইভার সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ড্রাইভার পাওয়া যায়নি",
            data: [],
        });
    }
});
exports.DriverController = {
    createDriverController,
    getAllDriversController,
    getSingleDriverController,
    updateDriverController,
    deleteDriverController,
    driverOptionsForDeliverController
};
