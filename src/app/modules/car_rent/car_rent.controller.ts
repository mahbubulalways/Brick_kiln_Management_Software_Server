import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";
import { CarRentService } from "./car_rent.service";
import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";

const createCarRentController = catchAsync(async (req, res) => {
        const user = req.user as TAuthUser;
    const result = await CarRentService.createCarRentService(user,req.body);

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
        const user = req.user as TAuthUser;
    const { limit, page, search } = await parseListQuery(req.query);
    const result = await CarRentService.getALlCarRentService(user,{ limit, page, search });
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
        const user = req.user as TAuthUser;
    const id =req.params.id;

    const result =
        await CarRentService.getSingleCarRentService(user,id);

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
        const user = req.user as TAuthUser;
    const id = req.params.id;

    const result =
        await CarRentService.updateCarRentService(
            user,
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
        const user = req.user as TAuthUser;
    const id = req.params.id;

    const result =
        await CarRentService.deleteCarRentService(user,id);

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