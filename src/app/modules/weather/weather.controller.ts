import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";

// ================= CREATE MANY WEATHER =================
const createWeatherController = catchAsync(async (req, res) => {
    const data = req.body;
    const existingWeather = await prisma.weather.findFirst();
    let result;
    if (!existingWeather) {
        result = await prisma.weather.create({
            data,
        });
    } else {
        result = await prisma.weather.update({
            where: {
                id: existingWeather.id,
            },
            data,
        });
    }
    if (!result.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "আবহাওয়ার তথ্য সংরক্ষণ করা যায়নি"
        );
    }
    sendResponse(res, {
        statusCode: existingWeather
            ? StatusCodes.OK
            : StatusCodes.CREATED,
        success: true,
        message: existingWeather
            ? "আবহাওয়ার তথ্য সফলভাবে আপডেট হয়েছে"
            : "আবহাওয়ার তথ্য সফলভাবে তৈরি হয়েছে",
        data: result,
    });
});


// ================= GET ALL WEATHER =================
const getAllWeatherController = catchAsync(async (req, res) => {
    const result = await prisma.weather.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "আবহাওয়ার তথ্য সফলভাবে পাওয়া গেছে",
        data: result,
    });
});


export const WeatherController = {
    createWeatherController,
    getAllWeatherController,
};