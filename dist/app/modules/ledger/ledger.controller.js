"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const ledger__service_1 = require("./ledger..service");
const parseListQuery_1 = require("../../../utils/parseListQuery");
// GET KHOTIYAN COUNT
const getLedgerCountController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getLedgerCountService(user);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো খতিয়ানের তথ্য পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "খতিয়ানের সংখ্যা সফলভাবে পাওয়া গেছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: { count: result },
    });
});
// CREATE NEW KHOTIYAN
const createLedgerController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const user = req.user;
    const result = await ledger__service_1.LedgerService.createLedgerService(user, body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "খতিয়ান তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: "খতিয়ান সফলভাবে তৈরি করা হয়েছে।",
        data: result,
    });
});
// GET KHOTIYAN GROUP OPTION
const getLedgerOptionController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getLedgerOptionService(user);
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো খতিয়ান গ্রুপ পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ান গ্রুপের তালিকা সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET ALL KHOTIYAN WITH CHILDREN
const getAllLedgerWithController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getAllLedgerWithChildrenService(user);
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো খতিয়ানের তালিকা পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানের তালিকা সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET ALL KHOTIYAN WITH PAGINATION
const getAllLedgerWithChildrenPaginationController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getAllLedgerWithChildrenPaginationService(user, {
        limit,
        page,
        search,
    });
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো খতিয়ানের তালিকা পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানের তালিকা সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET ALL KHOTIYAN WITH AMOUNT
const getLedgerWithAmountController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getAllLedgerWithAmountService(user);
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো খতিয়ানের হিসাব পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানের হিসাব সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET KHOTIYAN DETAILS
const getLedgerDetailsController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const { limit, page, date } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getDetailsLedgerService(user, id, {
        limit,
        page,
        date,
    });
    if (!result.data.data.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "এই খতিয়ানের কোনো বিস্তারিত তথ্য পাওয়া যায়নি।",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানের বিস্তারিত তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET SINGLE KHOTIYAN
const getSingleLedgerController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await ledger__service_1.LedgerService.getSingleLedgerService(user, id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "খতিয়ানটি পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// UPDATE KHOTIYAN
const updateLedgerController = (0, catchAsync_1.default)(async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const user = req.user;
    const result = await ledger__service_1.LedgerService.updateLedgerService(user, id, body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "খতিয়ানটি পাওয়া যায়নি অথবা আপডেট করা সম্ভব হয়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানের তথ্য সফলভাবে আপডেট করা হয়েছে।",
        data: result,
    });
});
// DELETE KHOTIYAN
const deleteLedgerController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const user = req.user;
    const result = await ledger__service_1.LedgerService.deleteLedgerService(user, id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "খতিয়ানটি পাওয়া যায়নি অথবা মুছে ফেলা সম্ভব হয়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "খতিয়ানটি সফলভাবে মুছে ফেলা হয়েছে।",
        data: result,
    });
});
exports.LedgerController = {
    getLedgerCountController,
    createLedgerController,
    getLedgerOptionController,
    getAllLedgerWithController,
    getLedgerWithAmountController,
    getLedgerDetailsController,
    getAllLedgerWithChildrenPaginationController,
    getSingleLedgerController,
    updateLedgerController,
    deleteLedgerController
};
