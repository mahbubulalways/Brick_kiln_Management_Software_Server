import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { LoadInfoService } from "./load.service";
import { sendResponse } from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApplicationError";
import { parseListQuery } from "../../../utils/parseListQuery";

// ===============================
// CREATE LOAD INFO
// ===============================
const createLoadInfoController = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await LoadInfoService.createLoadInfoService(req.body);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: "লোডের তথ্য সফলভাবে তৈরি হয়েছে",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্য তৈরি করতে ব্যর্থ হয়েছে"
            );
        }
    }
);

// ===============================
// GET ALL LOAD INFO
// ===============================
const getAllLoadInfoController = catchAsync(
    async (req: Request, res: Response) => {
        const { limit, page, search, date } = await parseListQuery(req.query);
        const result =
            await LoadInfoService.getAllLoadInfoService({ date, limit, page, search });

        if (result.data.length) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লোডের তথ্য সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: false,
                message: "কোনো লোডের তথ্য পাওয়া যায়নি",
                data: [],
            });
        }
    }
);

// ===============================
// GET SINGLE LOAD INFO
// ===============================
const getSingleLoadInfoController = catchAsync(
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (!id) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্যের আইডি সঠিক নয়"
            );
        }

        const result =
            await LoadInfoService.getSingleLoadInfoService(id);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লোডের তথ্য সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্য পাওয়া যায়নি"
            );

        }
    }
);

// ===============================
// UPDATE LOAD INFO
// ===============================
const updateLoadInfoController = catchAsync(
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (!id) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্যের আইডি সঠিক নয়"
            );
        }

        const existing =
            await LoadInfoService.getSingleLoadInfoService(id);

        if (!existing) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "লোডের তথ্য পাওয়া যায়নি"
            );
        }

        const result =
            await LoadInfoService.updateLoadInfoService(
                id,
                req.body
            );

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লোডের তথ্য সফলভাবে আপডেট হয়েছে",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্য আপডেট করতে ব্যর্থ হয়েছে"
            );
        }
    }
);

// ===============================
// DELETE LOAD INFO
// ===============================
const deleteLoadInfoController = catchAsync(
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (!id) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্যের আইডি সঠিক নয়"
            );
        }

        const existing =
            await LoadInfoService.getSingleLoadInfoService(id);

        if (!existing) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "লোডের তথ্য পাওয়া যায়নি"
            );
        }

        const result =
            await LoadInfoService.deleteLoadInfoService(id);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "লোডের তথ্য সফলভাবে ডিলেট হয়েছে",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "লোডের তথ্য ডিলেট করতে ব্যর্থ হয়েছে"
            );
        }
    }
);

// ===============================
// EXPORT
// ===============================
export const LoadInfoController = {
    createLoadInfoController,
    getAllLoadInfoController,
    getSingleLoadInfoController,
    updateLoadInfoController,
    deleteLoadInfoController,
};