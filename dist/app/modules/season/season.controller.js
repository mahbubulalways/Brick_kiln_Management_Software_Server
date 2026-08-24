"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonController = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const getAllSeasons = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prisma_1.prisma.season.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            startDate: "asc",
        },
    });
    if (!result.length) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো সিজন পাওয়া যায়নি",
            data: [],
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "সকল সিজন সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
const getActiveSeason = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prisma_1.prisma.season.findFirst({
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
        },
    });
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো সক্রিয় সিজন পাওয়া যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "সক্রিয় সিজন সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
const changeActiveSeason = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const season = await prisma_1.prisma.season.findUnique({
        where: {
            id,
        },
    });
    if (!season) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "সিজন পাওয়া যায়নি",
            data: [],
        });
    }
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.season.updateMany({
            data: {
                isActive: false,
            },
        }),
        prisma_1.prisma.season.update({
            where: {
                id,
            },
            data: {
                isActive: true,
            },
        }),
    ]);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "সিজন সফলভাবে পরিবর্তন করা হয়েছে",
    });
});
exports.SeasonController = {
    getActiveSeason,
    getAllSeasons,
    changeActiveSeason
};
