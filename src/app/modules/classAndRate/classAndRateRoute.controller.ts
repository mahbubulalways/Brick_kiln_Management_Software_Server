import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { ClassAndRateService } from "./classAndRateRoute.service";
import { sendResponse } from "../../../utils/sendResponse";
import { TAuthUser } from "../../../interface/token";

const createClassAndRateController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user as TAuthUser
  const result = await ClassAndRateService.createClassAndRateService(user, body);
  if (!result.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create Class & Rate"
    );
  } else {
    sendResponse(res, {
      message: "শ্রেণী সফলভাবে এড হয়েছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL CLASS AND RATE
const getClassAndRateController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await ClassAndRateService.getClassAndRateService(user);
  if (!result.length) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে"
    );
  } else {
    sendResponse(res, {
      message: "শ্রেণী ও রেট সফলভাবে পাওয়া গেছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE CLASS AND RATE
const getSingleClassAndRateController = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const user = req.user as TAuthUser
  const result = await ClassAndRateService.getSingleClassAndRateService(
    user,
    id
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে"
    );
  } else {
    sendResponse(res, {
      message: "শ্রেণী ও রেট সফলভাবে পাওয়া গেছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// Update CLASS AND RATE
const updateClassAndRateController = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const body = req.body;
  const user = req.user as TAuthUser
  const result = await ClassAndRateService.updateClassAndRateService(
    user,
    id,
    body
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "দুঃখিত! শ্রেণী ও রেট আপডেট করতে ব্যর্থ হয়েছে"
    );
  } else {
    sendResponse(res, {
      message: "শ্রেণী ও রেট সফলভাবে আপডেট হয়েছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const ClassAndRateController = {
  createClassAndRateController,
  getClassAndRateController,
  getSingleClassAndRateController,
  updateClassAndRateController,
};
