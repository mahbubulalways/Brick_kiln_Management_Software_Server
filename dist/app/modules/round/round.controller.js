"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoundController = void 0;
const prisma_1 = require("../../../helpers/prisma");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
exports.getRoundController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prisma_1.prisma.round.findMany({});
    if (!result.length) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "কোনো রাউন্ডের তথ্য পাওয়া যায়নি।",
            data: [],
        });
    }
    return (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "রাউন্ডের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
