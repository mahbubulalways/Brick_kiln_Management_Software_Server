import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { StockBookService } from "./stock_book.service";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

// CREATE STOCK BOOK CONTROLLER
const createStockBookController = catchAsync(async (req, res) => {
  const { body } = req;
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await StockBookService.createStockBookService(
    user,
    seasonId,
    body
  );
  if (!result.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "স্টক বুক তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
    );
  } else {
    sendResponse(res, {
      message: "স্টক বুক সফলভাবে তৈরি হয়েছে।",
      statusCode: StatusCodes.CREATED,
      success: true,
      data: result,
    });
  }
});


// GET ALL STOCK
const getAllStockController = catchAsync(async (req, res) => {
  const { limit, page, } = await parseListQuery(req.query);
  const seasonId = req.seasonId
  const user = req.user as TAuthUser
  const result = await StockBookService.getAllStockService(user, seasonId, { limit, page });
  if (!result.data.length) {
    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো স্টকের তথ্য পাওয়া যায়নি।",
      data: [],
    });
  }

  return sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "স্টকের তথ্য সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});



// DELETE
const deleteStockBookController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StockBookService.deleteStockService(id);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "স্টকের তথ্য ডিলেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
    );
  } else {
    sendResponse(res, {
      message: "স্টকের তথ্য সফলভাবে ডিলেট হয়েছে।",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

export const StockBookController = {
  createStockBookController,
  getAllStockController,
  deleteStockBookController
};