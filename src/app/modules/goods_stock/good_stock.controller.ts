import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";
import { GoodStockService } from "./good_stock.service";

// CREATE GOODS STOCK  CONTROLLER
const createGoodStockController = catchAsync(async (req, res) => {
    const result = await GoodStockService.createGoodStockService(
        req
    );
    if (!result.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল স্টকে যোগ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    } else {
        sendResponse(res, {
            message: "মালামাল সফলভাবে স্টকে যোগ হয়েছে।",
            statusCode: StatusCodes.CREATED,
            success: true,
        });

    }
});


// GET ALL 
const getAllGoodStockController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodStockService.getAllGoodStockService(user);

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "মালামাল সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো মালামাল পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);


// GET OPTIONS 
const getGoodStockOptionsController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodStockService.getGoodStockOptionsService(user);

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "মালামাল সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো মালামাল পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);


export const GoodStockController = {
    createGoodStockController,
    getAllGoodStockController,
    getGoodStockOptionsController
}