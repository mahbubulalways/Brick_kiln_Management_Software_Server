"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const ApplicationError_1 = require("../../errors/ApplicationError");
const sendResponse_1 = require("../../../utils/sendResponse");
// ================= CREATE MANY WEATHER =================
const createWeatherController = (0, catchAsync_1.default)(async (req, res) => {
    const data = req.body;
    const existingWeather = await prisma_1.prisma.weather.findFirst();
    let result;
    if (!existingWeather) {
        result = await prisma_1.prisma.weather.create({
            data,
        });
    }
    else {
        result = await prisma_1.prisma.weather.update({
            where: {
                id: existingWeather.id,
            },
            data,
        });
    }
    if (!result.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আবহাওয়ার তথ্য সংরক্ষণ করা যায়নি");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: existingWeather
            ? http_status_codes_1.StatusCodes.OK
            : http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: existingWeather
            ? "আবহাওয়ার তথ্য সফলভাবে আপডেট হয়েছে"
            : "আবহাওয়ার তথ্য সফলভাবে তৈরি হয়েছে",
        data: result,
    });
});
// ================= GET ALL WEATHER =================
const getAllWeatherController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await prisma_1.prisma.weather.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "আবহাওয়ার তথ্য সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
exports.WeatherController = {
    createWeatherController,
    getAllWeatherController,
};
