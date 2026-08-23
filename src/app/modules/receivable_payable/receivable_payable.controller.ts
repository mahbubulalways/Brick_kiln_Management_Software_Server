import { Request, Response } from "express";

import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ReceivablePayableService } from "./receivable_payable.service";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";

// ==========================================
// Create Receivable / Payable
// ==========================================

const createReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.createReceivablePayable(
                user,
                req.body
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: "লেনদেনের হিসাব সফলভাবে তৈরি হয়েছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "সঠিক transactionType প্রদান করুন।"
            );
        }
    }
);

// ==========================================
// Create Transaction
// ==========================================

const createTransactionController = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.createTransaction(
                user,
                id,
                req.body
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: "লেনদেন সফলভাবে তৈরি হয়েছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লেনদেন তৈরি করা যায়নি।"
            );
        }
    }
);

// ==========================================
// Get All Receivable / Payable
// ==========================================

const getAllReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.getAllReceivablePayable(user);

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লেনদেনের হিসাবসমূহ সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো লেনদেনের হিসাব পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

// ==========================================
// Get Single Receivable / Payable
// ==========================================

const getSingleReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.getSingleReceivablePayable(
                user,
                req.params.id
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লেনদেনের হিসাব সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "লেনদেনের হিসাব পাওয়া যায়নি।"
            );
        }
    }
);

// ==========================================
// Update Receivable / Payable
// ==========================================

const updateReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.updateReceivablePayable(
                user,
                req.params.id,
                req.body
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লেনদেনের হিসাব সফলভাবে আপডেট হয়েছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "লেনদেনের হিসাব পাওয়া যায়নি বা আপডেট করা যায়নি।"
            );
        }
    }
);

// ==========================================
// Delete Receivable / Payable
// ==========================================

const deleteReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.deleteReceivablePayable(
                user,
                req.params.id
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লেনদেনের হিসাব সফলভাবে মুছে ফেলা হয়েছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "লেনদেনের হিসাব পাওয়া যায়নি বা মুছে ফেলা যায়নি।"
            );
        }
    }
);

// ==========================================
// Get Current Amount
// ==========================================

const getCurrentAmountController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser;

        const result =
            await ReceivablePayableService.getCurrentAmountService(
                user,
                req.params.id
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "বর্তমান বকেয়া পরিমাণ সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "লেনদেনের হিসাব বা বর্তমান বকেয়া পরিমাণ পাওয়া যায়নি।"
            );
        }
    }
);

// ==========================================
// Export Controller
// ==========================================

export const ReceivablePayableController = {
    createReceivablePayableController,
    createTransactionController,
    getAllReceivablePayableController,
    getSingleReceivablePayableController,
    updateReceivablePayableController,
    deleteReceivablePayableController,
    getCurrentAmountController,
};