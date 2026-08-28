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
const prisma_1 = require("../../../helpers/prisma");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// GET INVOICE SERIAL
const getInvoiceSerial = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = (await prisma_1.prisma.challan.count({
        where: {
            vataId: user.vataId,
        },
    })) + 1;
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ইনভয়েস সিরিয়াল তৈরি করা যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "ইনভয়েস সিরিয়াল সফলভাবে তৈরি হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: {
            invoiceSerial: result,
        },
    });
});
// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
const createInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await challan_service_1.InvoiceService.createInvoiceService(user, seasonId, body.customer, body.invoiceItems.items, body.invoice);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান তৈরি করতে ব্যর্থ হয়েছে।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে তৈরি হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// SEARCH FOR DELIVERY
const searchChallanForDeliveryController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await challan_service_1.InvoiceService.searchChallanForDeliveryService(user, { search });
    if (!result) {
        return (0, sendResponse_1.sendResponse)(res, {
            message: "কোনো চ্যালান পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        return (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET AL INVOICE WITH CUSTOMER NAME AND ADDRESS
const getAllInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const seasonId = req.seasonId;
    const { limit, page, search, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await challan_service_1.InvoiceService.getAllInvoiceService(user, seasonId, { limit, page, search, date });
    if (!result?.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET ADVANVCE INVOICE
const getAllAdvanceInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const seasonId = req.seasonId;
    const { limit, page, search, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await challan_service_1.InvoiceService.getAllAdvanceInvoiceService(user, seasonId, {
        limit,
        page,
        search,
        date
    });
    if (!result?.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: [],
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
//  GET SINGLE INVOICE
const getSingleInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const user = req.user;
    const result = await challan_service_1.InvoiceService.getSingleInvoiceService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: !result?.id
                ? "চ্যালান পাওয়া যায়নি।"
                : "চ্যালান সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
//  GET SINGLE INVOICE ITEMS
const getSingleInvoiceItemsController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const query = req.query;
    const user = req.user;
    const result = await challan_service_1.InvoiceService.getSingleInvoiceItemsService(user, id, query?.ids);
    if (!result?.length) {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান পাওয়া যায়নি।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: {},
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// UPDATE INVOICE
const updateInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const body = req.body;
    const user = req.user;
    const result = await challan_service_1.InvoiceService.updateInvoiceService(user, id, body.invoice, body.invoiceItems);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান হালনাগাদ করতে ব্যর্থ হয়েছে।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে হালনাগাদ হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// DELETE INVOICE
const deleteInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params?.id;
    const user = req.user;
    const result = await challan_service_1.InvoiceService.deleteInvoiceService(user, id);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান মুছে ফেলতে ব্যর্থ হয়েছে।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: "চ্যালান সফলভাবে মুছে ফেলা হয়েছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// GET ITEMS WITH INVOICE
const getItemsWithInvoiceController = (0, catchAsync_1.default)(async (req, res) => {
    const { startDate, endDate } = req.query;
    const user = req.user;
    const seasonId = req.seasonId;
    const result = await challan_service_1.InvoiceService.getItemsWithInvoiceService(user, seasonId, startDate, endDate);
    if (!result?.length) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান পাওয়া যায়নি।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: " চ্যালান সফলভাবে পাওয়া গেছে।",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            data: result,
        });
    }
});
// CHANGE INVOICE DELIVERY DATE
const updateInvoiceDeliveryDateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params.id;
    const updatedDate = req.body.updatedDate;
    const user = req.user;
    const result = await challan_service_1.InvoiceService.updateInvoiceDeliveryDateService(user, id, updatedDate);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান আপডেট করতে ব্যর্থ হয়েছে।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: " চ্যালান সফলভাবে আপডেট হয়েছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
        });
    }
});
// CHANGE INVOICE ITEM DELIVERY DATE
const updateInvoiceItemDeliveryDateController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req?.params.id;
    const updatedDate = req.body.updatedDate;
    const user = req.user;
    const result = await challan_service_1.InvoiceService.updateItemsDateService(user, id, updatedDate);
    if (!result?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "চ্যালান আপডেট করতে ব্যর্থ হয়েছে।");
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            message: " চ্যালান সফলভাবে আপডেট হয়েছে",
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
        });
    }
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
    getAllAdvanceInvoiceController,
    searchChallanForDeliveryController
};
