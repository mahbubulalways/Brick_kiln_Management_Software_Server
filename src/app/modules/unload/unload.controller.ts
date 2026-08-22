import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { UnloadService } from "./unload.service";
import { AppError } from "../../errors/ApplicationError";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";

const createUnloadInfoController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser
        const result =
            await UnloadService.createNewUnloadService(user, req.body);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.CREATED,
                success: true,
                message: "আনলোডের তথ্য সফলভাবে তৈরি হয়েছে",
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "আনলোডের তথ্য তৈরি করতে ব্যর্থ হয়েছে"
            );
        }
    }
);


// GET ALL UNLOAD
const getAllUnloadInfoController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser
        const { limit, page, search, date } = await parseListQuery(req.query);
        const result =
            await UnloadService.getAllUnloadService(user, { date, limit, page, search });

        if (result.data.length) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "আনলোডের তথ্য সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: false,
                message: "কোনো আনলোডের তথ্য পাওয়া যায়নি",
                data: [],
            });
        }
    }
);

//  GET ALL DATA NOT PAGINATE 
const getAllUnloadDataNoPaginateController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser
        const result =
            await UnloadService.getAllUnloadDataNoPaginateService(user)

        if (result.length) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "আনলোডের তথ্য সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: false,
                message: "কোনো আনলোডের তথ্য পাওয়া যায়নি",
                data: [],
            });
        }
    }
);


// DELETE
const deleteUnloadInfoController = catchAsync(
    async (req, res) => {
        const id = req.params.id;
        const user = req.user as TAuthUser
        const result =
            await UnloadService.deleteUnloadService(user, id);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "আনলোডের তথ্য সফলভাবে ডিলেট হয়েছে",
                data: result,
            });
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "আনলোডের তথ্য ডিলেট করতে ব্যর্থ হয়েছে"
            );
        }
    }
);


export const UnloadController = {
    createUnloadInfoController,
    getAllUnloadInfoController,
    deleteUnloadInfoController,
    getAllUnloadDataNoPaginateController
}