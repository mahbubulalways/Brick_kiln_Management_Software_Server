import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { SmsService } from "./sms.service";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

// POST
const purchaseManualSmsController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await SmsService.purchaseManualSmsService(user, req.body);
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

// GET
const getMyVatarSmsReportController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await SmsService.getMyVatarSmsReportService(user);
  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো SMS রিপোর্ট পাওয়া যায়নি।",
      data: {},
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS রিপোর্ট সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

// GET VATAR INFO PAYMENT
const getSmspurchaseHistroyController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const { limit, page } = await parseListQuery(req.query);
  const result = await SmsService.getSmspurchaseHistroyService(user, {
    limit,
    page,
  });

  if (!result || result.data.length === 0) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো SMS ক্রয়ের ইতিহাস পাওয়া যায়নি।",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS ক্রয়ের ইতিহাস সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

// GET MANUAL REQUEST
const getManualSmspurchaseRequestController = catchAsync(async (req, res) => {
  const { limit, page } = await parseListQuery(req.query);
  const result = await SmsService.getManualSmspurchaseRequestService({
    limit,
    page,
  });

  if (!result || result.data.length === 0) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো ম্যানুয়াল SMS ক্রয়ের অনুরোধ পাওয়া যায়নি।",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "ম্যানুয়াল SMS ক্রয়ের অনুরোধগুলো সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

// GET ALL MESSAGE PURCHASE HISTORY
const getAllSmspurchaseHistoryController = catchAsync(async (req, res) => {
  const { limit, page } = await parseListQuery(req.query);
  const result = await SmsService.getAllSmspurchaseHistoryService({
    limit,
    page,
  });

  if (!result || result.data.length === 0) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো SMS ক্রয়ের ইতিহাস পাওয়া যায়নি।",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "সকল SMS ক্রয়ের ইতিহাস সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

// UPDATE SMS PAYMENT STATUS
const updateSmsPaymentStatusController = catchAsync(async (req, res) => {
  const result = await SmsService.updateSmsPaymentStatusService(
    req.params.id,
    req.body,
  );

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "SMS পেমেন্টের স্ট্যাটাস আপডেট করা সম্ভব হয়নি।",
    );
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS পেমেন্টের স্ট্যাটাস সফলভাবে আপডেট হয়েছে।",
      data: result,
    });
  }
});

export const SmsController = {
  purchaseManualSmsController,
  getMyVatarSmsReportController,
  getSmspurchaseHistroyController,
  getManualSmspurchaseRequestController,
  getAllSmspurchaseHistoryController,
  updateSmsPaymentStatusController,
};
