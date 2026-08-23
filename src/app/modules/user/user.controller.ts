import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserService } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";

const createUserController = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as TAuthUser
    const result = await UserService.createUserServie(user, req.body);
    if (!result) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ইউজার তৈরি করা যায়নি।"
        );
    }
    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "ইউজার সফলভাবে তৈরি হয়েছে।",
        data: result,
    });
});


// Get All Users
const getAllUsersController = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as TAuthUser
    const result = await UserService.getAllUsersService(user);
    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ইউজার খুঁজে পাওয়া যায়নি।",
            data: [],
        });
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সকল ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// Get Single User
const getSingleUserController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser
        const result = await UserService.getSingleUserService(
            user,
            req.params.id
        );

        if (!result) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "ইউজার খুঁজে পাওয়া যায়নি।"
            );
        }

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
);

// Update User
const updateUserController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser
        const result = await UserService.updateUserService(
            user,
            req.params.id,
            req.body
        );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ইউজারের তথ্য সফলভাবে আপডেট হয়েছে।",
            data: result,
        });
    }
);

// Delete User
const deleteUserController = catchAsync(
    async (req: Request, res: Response) => {
        const user = req.user as TAuthUser
        const result = await UserService.deleteUserService(
            user,
            req.params.id
        );

        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ইউজার সফলভাবে মুছে ফেলা হয়েছে।",
            data: result,
        });
    }
);


const getUserHistoryController = catchAsync(async (req: Request, res: Response) => {
    const { limit, page } = await parseListQuery(req.query);
    const user = req.user as TAuthUser
    const result = await UserService.getUserLoginHistoryService(user, { page, limit });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ইউজার খুঁজে পাওয়া যায়নি।",
            data: [],
        });
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সকল ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

const getUserOptionController = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as TAuthUser
    const result = await UserService.getUserOptionService(user);
    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ইউজার খুঁজে পাওয়া যায়নি।",
            data: [],
        });
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সকল ইউজারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});



export const UserController = {
    createUserController,
    getAllUsersController,
    getSingleUserController,
    updateUserController,
    deleteUserController,
    getUserHistoryController,
    getUserOptionController
};