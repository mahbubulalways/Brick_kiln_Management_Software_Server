import { StatusCodes } from "http-status-codes";

import { TAuthUser } from "../../../interface/token";
import { AppError } from "../../errors/ApplicationError";
import catchAsync from "../../../utils/catchAsync";
import { SubscriptionPaymentService } from "./subscription_payment.service";
import { sendResponse } from "../../../utils/sendResponse";


// CREATE NEW SUBSCRIPTION PAYMENT
const createNewSubscriptionPaymentController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const body = req.body;

        const result =
            await SubscriptionPaymentService.createNewSubscriptionPaymentService(
                user,
                body
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: "সাবস্ক্রিপশন পেমেন্ট সফলভাবে তৈরি হয়েছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "সাবস্ক্রিপশন পেমেন্ট তৈরি করা সম্ভব হয়নি।"
            );
        }
    }
);

// GET ALL PENDING FOR SYSTEM ADMIN
const getAllSubscriptionPaymentController = catchAsync(
    async (req, res) => {
        const result =
            await SubscriptionPaymentService.getAllSubscriptionPaymentService();

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "সকল পেন্ডিং সাবস্ক্রিপশন পেমেন্ট পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো পেন্ডিং সাবস্ক্রিপশন পেমেন্ট পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

// GET ALL PAID FOR SYSTEM ADMIN
const getAllPaidSubscriptionController = catchAsync(
    async (req, res) => {
        const result =
            await SubscriptionPaymentService.getAllPaidSubscriptionService();

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "সকল পরিশোধিত সাবস্ক্রিপশন পেমেন্ট পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো পরিশোধিত সাবস্ক্রিপশন পেমেন্ট পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

// GET OTHER FOR SYSTEM ADMIN
const getOtherSubscriptionController = catchAsync(
    async (req, res) => {
        const result =
            await SubscriptionPaymentService.getOtherSubscriptionService();

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "অন্যান্য সাবস্ক্রিপশন পেমেন্ট পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো অন্যান্য সাবস্ক্রিপশন পেমেন্ট পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

// GET VATA HISTORY
const getVataSubscriptionPaymentHistoryController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;

        const result =
            await SubscriptionPaymentService.getVataSubscriptionPaymentHistoryService(
                user
            );

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "সাবস্ক্রিপশন পেমেন্ট হিস্টোরি পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো সাবস্ক্রিপশন পেমেন্ট হিস্টোরি পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

// UPDATE SUBSCRIPTION PAYMENT
const updateSubscriptionPaymentControllerStatus = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const body = req.body;
   
        const result =
            await SubscriptionPaymentService.updateSubscriptionPaymnentStatus(
                id,
                body
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "সাবস্ক্রিপশন পেমেন্ট সফলভাবে আপডেট হয়েছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "সাবস্ক্রিপশন পেমেন্টটি পাওয়া যায়নি।"
            );
        }
    }
);

export const SubscriptionPaymentController = {
    createNewSubscriptionPaymentController,
    getAllSubscriptionPaymentController,
    getAllPaidSubscriptionController,
    getOtherSubscriptionController,
    getVataSubscriptionPaymentHistoryController,
    updateSubscriptionPaymentControllerStatus,
};