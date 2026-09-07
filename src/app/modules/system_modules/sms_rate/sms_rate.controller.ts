import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../utils/catchAsync";
import { SmsRateService } from "./sms_rate.service";
import { sendResponse } from "../../../../utils/sendResponse";
import { AppError } from "../../../errors/ApplicationError";

const createOrUpdateSmsRateController = catchAsync(async (req, res) => {
  const result = await SmsRateService.createOrUpdateSmsRateService(req.body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "SMS রেট সংরক্ষণ করা সম্ভব হয়নি।",
    );
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS রেট সফলভাবে সংরক্ষণ করা হয়েছে।",
      data: result,
    });
  }
});

const getSmsRateController = catchAsync(async (req, res) => {
  const result = await SmsRateService.getSmsRateService();
  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS রেটের তথ্য পাওয়া যায়নি।",
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS রেট সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

export const SmsRateController = {
  getSmsRateController,
  createOrUpdateSmsRateController,
};
