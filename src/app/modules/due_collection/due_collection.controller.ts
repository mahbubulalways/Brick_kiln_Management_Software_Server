import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { DueCollectionService } from "./due_collection.service";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

const getDueOfCustomerController = catchAsync(async (req, res) => {
  const customerId = req.params.customerId;
  const result = await DueCollectionService.getDueOfCustomerService(
    Number(customerId)
  );

  if (!result?.id) {
    sendResponse(res, {
      message: "সফলভাবে পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: {},
    });
  }
  sendResponse(res, {
    message: "সফলভাবে পাওয়া গেছে।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

//INSERT NEW DUE
const collectionNewDueController = catchAsync(async (req, res) => {
  const result = await DueCollectionService.collectDueService(req.body);
  if (!result?.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "বাকি জমা করতে ব্যর্থ হয়েছে।");
  }
  sendResponse(res, {
    message: "বাকি জমা সফলভাবে তৈরি হয়েছে।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// TODAY HAVE PAY
const todayPayDueController = catchAsync(async (req, res) => {
  const { limit, page, date, search } = await parseListQuery(req.query);

  const result = await DueCollectionService.todayPayDueService({ date, limit, page, search });
  if (!result?.data?.length) {
    sendResponse(res, {
      message: "আজকের  জন্য কোনো বাকি পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  } else {
    sendResponse(res, {
      message: "আজকের বাকি সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }

});

// TODAY PAID
const getTodaysDuePaidController = catchAsync(async (req, res) => {
  const { limit, page, date } = await parseListQuery(req.query);
  const result = await DueCollectionService.getTodaysDuePaidService({ date, limit, page });
  if (!result.data.length) {
    sendResponse(res, {
      message: "আজকের  জন্য কোনো বাকি পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  }
  else {
    sendResponse(res, {
      message: "আজকের বাকি সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

const getAllDueListController = catchAsync(async (req, res) => {
  const { limit, page, search, date } = await parseListQuery(req.query);

  const result = await DueCollectionService.getAllDueListService({date,limit,page,search});
  if (!result?.data?.length) {
    sendResponse(res, {
      message: "বাকি পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: " বাকি সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }

});

// GET SINGKE
const getSingleDueCollectionController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DueCollectionService.getSingleDueCollectionService(
    Number(id)
  );

  if (!result?.id) {
    throw new AppError(StatusCodes.NOT_FOUND, "NOT FOUND");
  }
  else {
    sendResponse(res, {
      message: "সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE DUE ONLY DATE
const getSingleDueCollectionDateController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DueCollectionService.getSingleDueCollectionDateService(
    Number(id)
  );
  if (!result?.id) {
    throw new AppError(StatusCodes.NOT_FOUND, "NOT FOUND");
  }
  else {
    sendResponse(res, {
      message: "সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});



//
const updateDueCollectionController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await DueCollectionService.updateDueCollectionService(
    Number(id),
    body
  );

  if (!result?.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "আপডেট করতে ব্যর্থ হয়েছে");
  }
  sendResponse(res, {
    message: "সফলভাবে আপডেট করেছে",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});



const updateDueCollectionDateController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await DueCollectionService.upDateDueCollectionDateService(
    id,
    body
  );

  if (!result?.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "আপডেট করতে ব্যর্থ হয়েছে");
  }
  sendResponse(res, {
    message: "সফলভাবে আপডেট করেছে",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const DueCollectionController = {
  collectionNewDueController,
  getDueOfCustomerController,
  todayPayDueController,
  getTodaysDuePaidController,
  getAllDueListController,
  getSingleDueCollectionController,
  updateDueCollectionController,
  updateDueCollectionDateController,
  getSingleDueCollectionDateController
};
