import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../utils/catchAsync";
import { AppError } from "../../../errors/ApplicationError";
import { SubscriptionService } from "./subscription.service";
import { sendResponse } from "../../../../utils/sendResponse";
import { TAuthUser } from "../../../../interface/token";

// CREATE SUBSCRIPTION PLAN
const createSubscriptionPlanController = catchAsync(async (req, res) => {
    const result = await SubscriptionService.createSubscriptionPlanService(
        req.body
    );

    if (!result) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "সাবস্ক্রিপশন প্ল্যান তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে তৈরি হয়েছে।",
    });
});


// GET ALL SUBSCRIPTIONS
const getAllPaymentController = catchAsync(async (req, res) => {
    const result = await SubscriptionService.getAllSubscriptionPlanService();

    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।",
            data: [],
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "সাবস্ক্রিপশন প্ল্যানগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// GET ALL SUBSCRIPTIONS OPTIONS
const getAllSubscriptionPlanOptionsController = catchAsync(async (req, res) => {
    const result = await SubscriptionService.getAllSubscriptionPlanOptionsService();

    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।",
            data: [],
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "সাবস্ক্রিপশন প্ল্যানগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// GET SINGLE SUBSCRIPTION
const getSingleSubscriptionController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result =
        await SubscriptionService.getSingleSubscriptionPlanService(id);

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।"
        );
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});


// GET VATA'S RUNNING  SUBSCRIPTION
const getSingleVataSubscriptionController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result =
        await SubscriptionService.getSingleVataSubscriptionService(id);

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।"
        );
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// UPDATE SINGLE SUBSCRIPTION
const updateSubscriptionController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    const result =
        await SubscriptionService.updateSubscriptionPlanService(
            id,
            payload
        );

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "সাবস্ক্রিপশন প্ল্যানটি পাওয়া যায়নি।"
        );
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সাবস্ক্রিপশন প্ল্যান সফলভাবে আপডেট হয়েছে।",
        data: result,
    });
});

export const SubscriptionController = {
    createSubscriptionPlanController,
    getAllPaymentController,
    getAllSubscriptionPlanOptionsController,
    getSingleSubscriptionController,
    updateSubscriptionController,
    getSingleVataSubscriptionController
}