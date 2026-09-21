import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { LedgerService } from "./ledger..service";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TAuthUser } from "../../../interface/token";

// GET KHOTIYAN COUNT
const getLedgerCountController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await LedgerService.getLedgerCountService(user);
  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "কোনো খতিয়ানের তথ্য পাওয়া যায়নি।",
    );
  }

  sendResponse(res, {
    message: "খতিয়ানের সংখ্যা সফলভাবে পাওয়া গেছে।",
    statusCode: StatusCodes.OK,
    success: true,
    data: { count: result },
  });
});

// CREATE NEW KHOTIYAN
const createLedgerController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await LedgerService.createLedgerService(user, seasonId, body);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "খতিয়ান তৈরি করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    );
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "খতিয়ান সফলভাবে তৈরি করা হয়েছে।",
    data: result,
  });
});

// GET KHOTIYAN GROUP OPTION
const getLedgerOptionController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await LedgerService.getLedgerOptionService(user, seasonId);
  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো খতিয়ান গ্রুপ পাওয়া যায়নি।",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ান গ্রুপের তালিকা সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

// GET ALL KHOTIYAN WITH CHILDREN
const getAllLedgerWithController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await LedgerService.getAllLedgerWithChildrenService(
    user,
    seasonId,
  );

  if (!result) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো খতিয়ানের তালিকা পাওয়া যায়নি।",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ানের তালিকা সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

// GET ALL KHOTIYAN WITH PAGINATION
const getAllLedgerWithChildrenPaginationController = catchAsync(
  async (req, res) => {
    const { limit, page, search } = await parseListQuery(req.query);
    const user = req.user as TAuthUser;
    const seasonId = req.seasonId;
    const result =
      await LedgerService.getAllLedgerWithChildrenPaginationService(
        user,
        seasonId,
        {
          limit,
          page,
          search,
        },
      );

    if (!result) {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কোনো খতিয়ানের তালিকা পাওয়া যায়নি।",
      });
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "খতিয়ানের তালিকা সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  },
);

// GET ALL KHOTIYAN WITH AMOUNT
const getLedgerWithAmountController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await LedgerService.getAllLedgerWithAmountService(
    user,
    seasonId,
  );

  if (!result.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো খতিয়ানের হিসাব পাওয়া যায়নি।",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ানের হিসাব সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

// GET KHOTIYAN DETAILS
const getLedgerDetailsController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { limit, page, date } = await parseListQuery(req.query);
  const user = req.user as TAuthUser;
  const seasonId = req.seasonId;
  const result = await LedgerService.getDetailsLedgerService(
    user,
    seasonId,
    id,
    {
      limit,
      page,
      date,
    },
  );

  if (!result.data.data.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "এই খতিয়ানের কোনো বিস্তারিত তথ্য পাওয়া যায়নি।",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ানের বিস্তারিত তথ্য সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

// GET SINGLE KHOTIYAN
const getSingleLedgerController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user as TAuthUser;
  const result = await LedgerService.getSingleLedgerService(user, id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "খতিয়ানটি পাওয়া যায়নি।");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ানের তথ্য সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});

// UPDATE KHOTIYAN
const updateLedgerController = catchAsync(async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const user = req.user as TAuthUser;
  const result = await LedgerService.updateLedgerService(user, id, body);

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "খতিয়ানটি পাওয়া যায়নি অথবা আপডেট করা সম্ভব হয়নি।",
    );
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ানের তথ্য সফলভাবে আপডেট করা হয়েছে।",
    data: result,
  });
});

// DELETE KHOTIYAN
const deleteLedgerController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = req.user as TAuthUser;
  const result = await LedgerService.deleteLedgerService(user, id);

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "খতিয়ানটি পাওয়া যায়নি অথবা মুছে ফেলা সম্ভব হয়নি।",
    );
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "খতিয়ানটি সফলভাবে মুছে ফেলা হয়েছে।",
    data: result,
  });
});

export const LedgerController = {
  getLedgerCountController,
  createLedgerController,
  getLedgerOptionController,
  getAllLedgerWithController,
  getLedgerWithAmountController,
  getLedgerDetailsController,
  getAllLedgerWithChildrenPaginationController,
  getSingleLedgerController,
  updateLedgerController,
  deleteLedgerController,
};
