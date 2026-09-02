import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { GoodsCategoryService } from "./goods_category.service";
import { sendResponse } from "../../../utils/sendResponse";

// CREATE GOODS STOCK  CATEGORY CONTROLLER
const createGoodStockController = catchAsync(async (req, res) => {
    const { body } = req;
    const user = req.user as TAuthUser;
    const result = await GoodsCategoryService.createGoodCategoryService(
        user,
        body
    );
    if (!result.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামালের ক্যাটাগরি তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    } else {
        sendResponse(res, {
            message: "মালামালের ক্যাটাগরি সফলভাবে তৈরি হয়েছে।",
            statusCode: StatusCodes.CREATED,
            success: true,
        });
    }
});


const getAllGoodCategoryController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodsCategoryService.getGoodCategoryService(user);

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "মালামালের ক্যাটাগরিসমূহ সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো মালামালের ক্যাটাগরি পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);


const getGoodCategoryOptionsController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodsCategoryService.getGoodCategoryService(user);

        if (result.length > 0) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "মালামালের ক্যাটাগরিসমূহ সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো মালামালের ক্যাটাগরি পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

const getSingleGoodCategoryController = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const user = req.user as TAuthUser;
    const result =
      await GoodsCategoryService.getSingleGoodCategoryService(
        user,
        id
      );
    if (!result) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "মালামালের ক্যাটাগরি পাওয়া যায়নি।"
      );
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "মালামালের ক্যাটাগরি সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
);

const updateGoodCategoryController = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const user = req.user as TAuthUser;
    const result =
      await GoodsCategoryService.updateGoodCategoryService(
        user,
        id,
        body
      );

    if (!result.id) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "মালামালের ক্যাটাগরি আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "মালামালের ক্যাটাগরি সফলভাবে আপডেট হয়েছে।",
      data: result,
    });
  }
);

export const GoodCategoryController = {
    createGoodStockController,
    getAllGoodCategoryController,
    getSingleGoodCategoryController,
    updateGoodCategoryController,
    getGoodCategoryOptionsController
}