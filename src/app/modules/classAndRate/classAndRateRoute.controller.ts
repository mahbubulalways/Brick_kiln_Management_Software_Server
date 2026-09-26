import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { ClassAndRateService } from "./classAndRateRoute.service";
import { sendResponse } from "../../../utils/sendResponse";
import { TAuthUser } from "../../../interface/token";
import { parseListQuery } from "../../../utils/parseListQuery";

const createClassAndRateController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user as TAuthUser;

  const result = await ClassAndRateService.createClassAndRateService(
    user,
    body,
  );

  if (!result?.id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "শ্রেণী ও রেট যোগ করা যায়নি");
  }

  sendResponse(res, {
    message: "শ্রেণী ও রেট সফলভাবে যোগ করা হয়েছে",
    statusCode: StatusCodes.CREATED,
    success: true,
    data: result,
  });
});

// GET ALL CLASS AND RATE
const getClassAndRateController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const { limit, page } = await parseListQuery(req.query);
  const result = await ClassAndRateService.getClassAndRateService(user, {
    limit,
    page,
  });
  if (!result.data.length) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে",
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
  const user = req.user as TAuthUser;
  const result = await ClassAndRateService.getSingleClassAndRateService(
    user,
    id,
  );
  if (!result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে",
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
  const user = req.user as TAuthUser;
  const result = await ClassAndRateService.updateClassAndRateService(
    user,
    id,
    body,
  );
  if (!result?.result.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "দুঃখিত! শ্রেণী ও রেট আপডেট করতে ব্যর্থ হয়েছে",
    );
  } else {
    sendResponse(res, {
      message: result?.message,
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

const deleteClassAndRateController = catchAsync(async (req, res) => {
  const id = req.params?.id;
  const user = req.user as TAuthUser;
  const result = await ClassAndRateService.deleteClassAndRateService(user, id);
  if (!result?.result?.id) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "দুঃখিত! শ্রেণী ও রেট মুছে ফেলতে ব্যর্থ হয়েছে",
    );
  } else {
    sendResponse(res, {
      message: result?.message,
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

// OPTIONS
const getClassAndRateOptionsController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;
  const result = await ClassAndRateService.getClassAndRateOptionsService(user);
  if (!result.length) {
    sendResponse(res, {
      message: "শ্রেণী ও রেট নিয়ে তথ্য আনতে ব্যর্থ হয়েছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "শ্রেণী ও রেট সফলভাবে পাওয়া গেছে",
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
  deleteClassAndRateController,
  getClassAndRateOptionsController,
};
