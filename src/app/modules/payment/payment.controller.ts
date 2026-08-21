import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { PaymentService } from "./payment.service";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";

// CREATE NEW LEDGER
const createPaymentController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await PaymentService.createPaymentService(req, user);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "পেমেন্ট তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }
  else {
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "পেমেন্ট সফলভাবে তৈরি করা হয়েছে।",

    });
  }
});

// GET ALL PAYMENT PAGINATE AND SEARCH
const getAllPaymentController = catchAsync(async (req, res) => {
  const { limit, page, search, date } = await parseListQuery(req.query);
  const user = req.user as TAuthUser
  const result = await PaymentService.getAllPaymentService(user, {
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

  else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "পেমেন্টগুলো সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

//

// GET ALL PAYMENT PAGINATE AND SEARCH
const paymentReportViaGroupController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await PaymentService.paymentReportViaGroupService(user);
  if (!result.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো পেমেন্ট পাওয়া যায়নি।",
      data: [],
    });
  }

  else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "পেমেন্টগুলো সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});


// GET SINGLE PAYMENT
const getSinglePaymentController = catchAsync(async (req, res) => {
  const id = req.params.id
  const user = req.user as TAuthUser
  const result = await PaymentService.getSinglePaymentService(user, id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "কোনো পেমেন্ট পাওয়া যায়নি।")
  }

  else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "পেমেন্ট সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});


// UPDATE PAYMENT
const updatePaymentController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await PaymentService.updatePaymentService(user, req);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "পেমেন্ট আপডেট করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

  else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "পেমেন্ট সফলভাবে আপডেট করা হয়েছে।",

    });
  }
});


// DELETE PAYMENT (SOFT)
const deletePaymentController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user as TAuthUser
  const result =
    await PaymentService.deletePaymentServie(user, id);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "পেমেন্ট মুছে ফেলা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }
  else {

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "পেমেন্ট সফলভাবে মুছে ফেলা হয়েছে।",
    });
  }
});

export const PaymentController = {
  createPaymentController,
  getAllPaymentController,
  paymentReportViaGroupController,
  getSinglePaymentController,
  updatePaymentController,
  deletePaymentController
};
