import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { LedgerService } from "./ledger..service";

// GET LEDGER COUNT
const getLedgerCountController = catchAsync(async (req, res) => {
  const result = await LedgerService.getLedgerCountService();

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "NOT FOUND");
  }
  sendResponse(res, {
    message: "সফলভাবে পাওয়া গেছে।",
    statusCode: StatusCodes.OK,
    success: true,
    data: { count: result },
  });
});

// CREATE NEW LEDGER
const createLedgerController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await LedgerService.createLedgerService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "লেজার তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "লেজার সফলভাবে তৈরি করা হয়েছে।",
    data: result,
  });
});

// GET GROUP OPTION
const getLedgerOptionController = catchAsync(async (req, res) => {
  const result = await LedgerService.getLedgerOptionService();
  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "লেজার অপশনের তালিকা পাওয়া যায়নি।",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "লেজার অপশন সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

// GET ALL LEDGER WITH CHILDREN
const getAllLedgerWithController = catchAsync(async (req, res) => {
  const result = await LedgerService.getAllLedgerWithChildrenService();
  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "লেজার তালিকা পাওয়া যায়নি।",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "লেজার সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

export const LedgerController = {
  getLedgerCountController,
  createLedgerController,
  getLedgerOptionController,
  getAllLedgerWithController,
};
