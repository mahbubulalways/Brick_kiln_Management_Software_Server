import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";

import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";

import { VataBackupService } from "./backup.service";

// Create Vata Backup

const createVataBackupController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;

  if (user?.vataId) {
    const result = await VataBackupService.createVataBackupService(user);

    if (result) {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ভাটার ব্যাকআপ সফলভাবে তৈরি হয়েছে",
        data: result,
      });
    } else {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "ভাটার ব্যাকআপ তৈরি করা যায়নি",
      );
    }
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "ভাটার তথ্য পাওয়া যায়নি");
  }
});

// Get Vata Backup

const getVataBackupController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;

  if (user?.vataId) {
    const result = await VataBackupService.getVataBackupService(user);
    if (result) {
      console.log(result);
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ভাটার ব্যাকআপ সফলভাবে পাওয়া গেছে",
        data: result,
      });
    } else {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "কোনো ভাটার ব্যাকআপ পাওয়া যায়নি",
      );
    }
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "ভাটার তথ্য পাওয়া যায়নি");
  }
});

export const VataBackupController = {
  createVataBackupController,
  getVataBackupController,
};
