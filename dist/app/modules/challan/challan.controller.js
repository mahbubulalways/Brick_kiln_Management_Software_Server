"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const challan_service_1 = require("./challan.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
// GET INVOICE SERIAL
const getInvoiceSerial = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prisma_1.default.challan.count();
    (0, sendResponse_1.sendResponse)(res, {
        message: "চ্যালান পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: { totalInvoice: result },
    });
});
// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
const createInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const user = "Mahbubul Hasan"; // TODO : Here name comes from auth
    const result = await challan_service_1.InvoiceService.createInvoiceService(user, body.customer, body.invoiceItems.items, body.invoice);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান তৈরি করতে ব্যর্থ হয়েছে।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "চ্যালান সফলভাবে তৈরি হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// GET AL INVOICE WITH CUSTOMER NAME AND ADDRESS
const getAllInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await challan_service_1.InvoiceService.getAllInvoiceService();
    if (!result?.length) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "চ্যালান সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
//  GET SINGLE INVOICE
const getSingleInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const result = await challan_service_1.InvoiceService.getSingleInvoiceService(Number(id));
    // if (!result?.id) {
    //   throw new AppError(StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
    // }
    (0, sendResponse_1.sendResponse)(res, {
        message: !result?.id
            ? "চ্যালান পাওয়া যায়নি।"
            : "চ্যালান সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
//  GET SINGLE INVOICE ITEMS
const getSingleInvoiceItemsController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    console.log(id);
    const query = req.query;
    const result = await challan_service_1.InvoiceService.getSingleInvoiceItemsService(Number(id), query?.ids);
    if (!result?.length) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "চ্যালান সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// UPDATE INVOICE
const updateInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const body = req.body;
    const result = await challan_service_1.InvoiceService.updateInvoiceController(Number(id), body.invoice, body.invoiceItems);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান হালনাগাদ করতে ব্যর্থ হয়েছে।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "চ্যালান সফলভাবে হালনাগাদ হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// DELETE INVOICE
const deleteInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const result = await challan_service_1.InvoiceService.deleteInvoiceService(Number(id));
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান মুছে ফেলতে ব্যর্থ হয়েছে।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "চ্যালান সফলভাবে মুছে ফেলা হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// GET ITEMS WITH INVOICE
const getItemsWithInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const { startDate, endDate } = req.query;
    const result = await challan_service_1.InvoiceService.getItemsWithInvoiceService(startDate, endDate);
    if (!result?.length) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: " চ্যালান সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// CHANGE INVOICE DELIVERY DATE
const updateInvoiceDeliveryDateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params.id;
    const updatedDate = req.body.updatedDate;
    const result = await challan_service_1.InvoiceService.updateInvoiceDeliveryDateService(Number(id), updatedDate);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান আপডেট করতে ব্যর্থ হয়েছে।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: " চ্যালান সফলভাবে আপডেট হয়েছে",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
// CHANGE INVOICE ITEM DELIVERY DATE
const updateInvoiceItemDeliveryDateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params.id;
    const updatedDate = req.body.updatedDate;
    const result = await challan_service_1.InvoiceService.updateItemsDateService(Number(id), updatedDate);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান আপডেট করতে ব্যর্থ হয়েছে।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: " চ্যালান সফলভাবে আপডেট হয়েছে",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
exports.InvoiceController = {
    createInvoiceController,
    getInvoiceSerial,
    getAllInvoiceController,
    getSingleInvoiceController,
    updateInvoiceController,
    deleteInvoiceController,
    getItemsWithInvoiceController,
    getSingleInvoiceItemsController,
    updateInvoiceDeliveryDateController,
    updateInvoiceItemDeliveryDateController,
};
