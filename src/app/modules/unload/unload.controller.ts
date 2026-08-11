import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { UnloadService } from "./unload.service";
import { AppError } from "../../errors/ApplicationError";

const createUnloadInfoController = catchAsync(
    async (req, res) => {
        const result =
            await UnloadService.createNewUnloadService(req.body);

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
        // const { limit, page, search, date } = await parseListQuery(req.query); { date, limit, page, search }
        const result =
            await UnloadService.getAllUnloadService();

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


export const UnloadController = {
    createUnloadInfoController,
    getAllUnloadInfoController
}