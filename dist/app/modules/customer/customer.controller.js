"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const customer_service_1 = require("./customer.service");
const parseListQuery_1 = require("../../../utils/parseListQuery");
const ApplicationError_1 = require("../../errors/ApplicationError");
// GET DATA FOR UPDATE
const getSingleCustomerInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await customer_service_1.CustomerService.getSingleCustomerService(user, req.params.id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// UPDATE
const updateCustomerInfoController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await customer_service_1.CustomerService.updateCustomerService(user, req.params.id, req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "সফলভাবে আপডেট করেছে",
            data: result,
        });
    }
});
// GET ALL CUSTOMER INFO
const getAllCustomertController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const seasonId = req.seasonId;
    const user = req.user;
    const result = await customer_service_1.CustomerService.getAllCustomerService(user, seasonId, { limit, page, search });
    if (!result || result.data.length === 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
const getSingleCustomertController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await customer_service_1.CustomerService.getSingleCustomerInformationService(user, id);
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET CUSTOMER ALL CHALLANS
const getCustomertAllChallanController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const { limit, page, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await customer_service_1.CustomerService.getCustomerAllChallanService(user, id, { date, limit, page });
    if (!result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET CUSTOMER ALL CHALLANS
const getCustomerAllDeliveryController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { limit, page, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await customer_service_1.CustomerService.getCustomerAllDeliveryService(user, id, { date, limit, page });
    if (!result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
// GET CUSTOMER ALL DUES
const getCustomerAllDuesController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { limit, page, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await customer_service_1.CustomerService.getCustomerAllDuesService(user, id, { date, limit, page });
    if (!result.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
//  GET OLD CUSTOMER
const getOldCustomerController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await customer_service_1.CustomerService.getOldCustomerService(user, search);
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});
exports.CustomerController = {
    getAllCustomertController,
    getSingleCustomertController,
    getCustomertAllChallanController,
    getCustomerAllDeliveryController,
    getCustomerAllDuesController,
    getSingleCustomerInfoController,
    updateCustomerInfoController,
    getOldCustomerController,
};
