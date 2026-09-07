import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { VataSmsSettingsService } from "./vata_sms_sittings.service";

const createOrUpdateVataSmsController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await VataSmsSettingsService.createOrUpdateVataSmsSettings(
    user,
    req.body,
  );

  if (result) {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "SMS সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে",
    });
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "SMS সেটিংস সংরক্ষণ করা যায়নি");
  }
});

const getVataSmsSettingController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await VataSmsSettingsService.getVataSmsSettingService(user);

  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "SMS সেটিংসের তথ্য সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "SMS সেটিংসের কোনো তথ্য পাওয়া যায়নি",
    );
  }
});

export const VataSmsSettingsController = {
  createOrUpdateVataSmsController,
  getVataSmsSettingController,
};
