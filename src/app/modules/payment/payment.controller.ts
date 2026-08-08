import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { PaymentService } from "./payment.service";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

// CREATE NEW LEDGER
const createPaymentController = catchAsync(async (req, res) => {
  const result = await PaymentService.createPaymentService(req);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "পেমেন্ট তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "পেমেন্ট সফলভাবে তৈরি করা হয়েছে।",
    data: result,
  });
});

// GET ALL PAYMENT PAGINATE AND SEARCH
const getAllPaymentController = catchAsync(async (req, res) => {
  const { limit, page, search, date } = await parseListQuery(req.query);
  const result = await PaymentService.geAllPaymentService({
    limit,
    page,
    search,
    date,
  });

  if (!result.data.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো পেমেন্ট পাওয়া যায়নি।",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "পেমেন্টগুলো সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

//

// GET ALL PAYMENT PAGINATE AND SEARCH
const paymentReportViaGroupController = catchAsync(async (req, res) => {
  const result = await PaymentService.paymentReportViaGroupService();

  if (!result.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো পেমেন্ট পাওয়া যায়নি।",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "পেমেন্টগুলো সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});
export const PaymentController = {
  createPaymentController,
  getAllPaymentController,
  paymentReportViaGroupController,
};
