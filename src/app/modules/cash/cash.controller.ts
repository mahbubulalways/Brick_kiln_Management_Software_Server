import { Request, Response } from "express";
import { CashService } from "./cash.service";
import { sendResponse } from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";

// CREATE CASH
const createCash = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as TAuthUser
    const result = await CashService.createCashService(user, req.body);

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ক্যাশ সফলভাবে তৈরি হয়েছে",
        });
    } else {
        throw new AppError(StatusCodes.BAD_REQUEST, "ক্যাশ তৈরি করা যায়নি")
    }
});

// GET ALL CASH
const getAllCash = catchAsync(async (req: Request, res: Response) => {
    const { limit, page, date, search } = await parseListQuery(req.query);
    const user = req.user as TAuthUser
    const result = await CashService.getAllCashService(user, { date, limit, page, search });
    if (result.data.length > 0) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "ক্যাশের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ক্যাশের তথ্য পাওয়া যায়নি",
            data: [],
        });
    }
});

// GET SINGLE CASH
const getSingleCash = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user as TAuthUser
    const result = await CashService.getSingleCashService(user, id);

    if (result) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "ক্যাশের তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        throw new AppError(StatusCodes.NOT_FOUND, "ক্যাশের তথ্য পাওয়া যায়নি")
    }
});

// UPDATE CASH
const updateCash = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as TAuthUser
    const id = req.params.id;
    const existingCash = await CashService.getSingleCashService(user, id);

    if (!existingCash) {
        sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "আপডেট করার জন্য ক্যাশের তথ্য পাওয়া যায়নি",
            data: null,
        });
    } else {
        const result = await CashService.updateCashService(user, id, req.body);

        if (result) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "ক্যাশের তথ্য সফলভাবে আপডেট হয়েছে",
                data: result,
            });
        } else {
            throw new AppError(StatusCodes.BAD_REQUEST, "ক্যাশের তথ্য আপডেট করা যায়নি")
        }
    }
});

// DELETE CASH
const deleteCash = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user as TAuthUser
    const existingCash = await CashService.getSingleCashService(user, id);

    if (!existingCash) {
        sendResponse(res, {
            statusCode: 404,
            success: false,
            message: "ডিলিট করার জন্য ক্যাশের তথ্য পাওয়া যায়নি",
        });
    } else {
        const result = await CashService.deleteCashService(user, id);

        if (result) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "ক্যাশের তথ্য সফলভাবে ডিলিট হয়েছে",
                data: result,
            });
        } else {
            throw new AppError(StatusCodes.BAD_REQUEST, "ক্যাশের তথ্য ডিলিট করা যায়নি")

        }
    }
});

export const CashController = {
    createCash,
    getAllCash,
    getSingleCash,
    updateCash,
    deleteCash,
};