import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { VataCarService } from "./vata_car.service";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

// NEW CAR
const createNewVataCarController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await VataCarService.createNewVataACarService(user, req.body);
  if (result) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "গাড়ি সফলভাবে তৈরি হয়েছে",
    });
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "গাড়ি তৈরি করা যায়নি");
  }
});

// ALL CAR
const getAllCarController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await VataCarService.getAllVataACarService(user);
  if (result.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "সকল গাড়ি সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো গাড়ি পাওয়া যায়নি",
      data: [],
    });
  }
});

// SINGLE CAR DELIVERY INCOME
const getSingleCarDeliveryIncomController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await VataCarService.singleCarDeliveryIncomeService(
    user,
    req.params.id,
  );
  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "গাড়ির ডেলিভারি আয়ের তথ্য সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "গাড়ির ডেলিভারি আয়ের কোনো তথ্য পাওয়া যায়নি",
    );
  }
});

// CAR INCOME

// ALL CAR
const getCarIncomeHistoryController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await VataCarService.getAllCarIncomeHistory(user);
  if (result.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "সকল গাড়ি সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো গাড়ি পাওয়া যায়নি",
      data: [],
    });
  }
});

export const VataCarController = {
  createNewVataCarController,
  getAllCarController,
  getSingleCarDeliveryIncomController,
  getCarIncomeHistoryController,
};
