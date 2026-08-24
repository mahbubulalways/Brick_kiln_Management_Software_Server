"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("./contact.service");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const parseListQuery_1 = require("../../../utils/parseListQuery");
const createContactController = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await contact_service_1.ContactService.createContactService(user, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "ফোন নম্বর সফলভাবে যোগ করা হয়েছে",
            data: result,
        });
    }
    else {
        throw new Error("ফোন নম্বর যোগ করা যায়নি");
    }
});
const getAllContactController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page, search } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const user = req.user;
    const result = await contact_service_1.ContactService.getAllContactService(user, { limit, page, search });
    if (result.data.length > 0) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "সকল ফোন নম্বর সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ফোন নম্বর পাওয়া যায়নি",
            data: [],
        });
    }
});
const getSingleContactController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await contact_service_1.ContactService.getSingleContactService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ফোন নম্বর সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        throw new Error("ফোন নম্বর পাওয়া যায়নি");
    }
});
const updateContactController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await contact_service_1.ContactService.updateContactService(user, id, req.body);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ফোন নম্বর সফলভাবে আপডেট করা হয়েছে",
            data: result,
        });
    }
    else {
        throw new Error("ফোন নম্বর আপডেট করা যায়নি");
    }
});
const deleteContactController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const result = await contact_service_1.ContactService.deleteContactService(user, id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "ফোন নম্বর সফলভাবে মুছে ফেলা হয়েছে",
            data: result,
        });
    }
    else {
        throw new Error("ফোন নম্বর মুছে ফেলা যায়নি");
    }
});
exports.ContactController = {
    createContactController,
    getAllContactController,
    getSingleContactController,
    updateContactController,
    deleteContactController,
};
