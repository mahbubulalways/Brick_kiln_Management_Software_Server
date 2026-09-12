"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqController = void 0;
const faq_service_1 = require("./faq.service");
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponse_1 = require("../../../../utils/sendResponse");
const createFaq = (0, catchAsync_1.default)(async (req, res) => {
    const result = await faq_service_1.FaqService.crateFaqService(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "FAQ তৈরি করা হয়েছে",
        data: result,
    });
});
const getFaq = (0, catchAsync_1.default)(async (req, res) => {
    const result = await faq_service_1.FaqService.getFaqService();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "FAQ পাওয়া গেছে",
        data: result,
    });
});
const updateFaq = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await faq_service_1.FaqService.updateFaqService(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "FAQ আপডেট করা হয়েছে",
        data: result,
    });
});
exports.FaqController = {
    createFaq,
    getFaq,
    updateFaq,
};
