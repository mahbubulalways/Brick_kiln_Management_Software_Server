import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../utils/catchAsync";
import { AppError } from "../../../errors/ApplicationError";
import { SubscriptionService } from "./subscription.service";
import { sendResponse } from "../../../../utils/sendResponse";

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
const ggetAllSubscriptionPlanOptionsController = catchAsync(async (req, res) => {
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

export const SubscriptionController = {
    createSubscriptionPlanController,
    getAllPaymentController,
    ggetAllSubscriptionPlanOptionsController
}