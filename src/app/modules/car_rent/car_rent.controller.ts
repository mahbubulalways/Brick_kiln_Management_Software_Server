import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";
import { CarRentService } from "./car_rent.service";
import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";

const createCarRentController = catchAsync(async (req, res) => {
    const result = await CarRentService.createCarRentService(req.body);

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে তৈরি হয়েছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "গাড়ি ভাড়ার তথ্য তৈরি করা যায়নি।"
        );
    }
});


const getALlCarRentController = catchAsync(async (req, res) => {
    const { limit, page, search } = await parseListQuery(req.query);
    const result = await CarRentService.getALlCarRentService({ limit, page, search });
    if (result?.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্যসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।",
            data: [],
        });
    }
});


const getSingleCarRentController = catchAsync(async (req, res) => {
    const id = Number(req.params.id);

    const result =
        await CarRentService.getSingleCarRentService(id);

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।"
        );
    }
});


const updateCarRentController = catchAsync(async (req, res) => {
    const id = Number(req.params.id);

    const result =
        await CarRentService.updateCarRentService(
            id,
            req.body
        );

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে আপডেট হয়েছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "গাড়ি ভাড়ার তথ্য আপডেট করা যায়নি।"
        );
    }
});


const deleteCarRentController = catchAsync(async (req, res) => {
    const id = Number(req.params.id);

    const result =
        await CarRentService.deleteCarRentService(id);

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "গাড়ি ভাড়ার তথ্য সফলভাবে ডিলেট করা হয়েছে।",
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "গাড়ি ভাড়ার তথ্য ডিলেট করা যায়নি।"
        );
    }
});


export const CarRentController = {
    createCarRentController,
    getALlCarRentController,
    getSingleCarRentController,
    updateCarRentController,
    deleteCarRentController,
};