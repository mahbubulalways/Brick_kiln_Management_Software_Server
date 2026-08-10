import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { DeliveryService } from "./delivery.service";
import { StatusCodes } from "http-status-codes";

const getNextDeliveryNoController = catchAsync(async (req, res) => {
  const result = await DeliveryService.getNextDeliveryNo();
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "কোনো ডেলিভারি পাওয়া যায়নি।")

  } else {
    sendResponse(res, {
      message: "সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }

});

// GET DELIVERY THAT GO TODAY
const getDeliveryThatGoTodayController = catchAsync(async (req, res) => {
  const { limit, page, date, search } = await parseListQuery(req.query);
  const result = await DeliveryService.getDeliveryThatGoTodayService({ date, limit, page, search });
  if (!result?.data?.length) {
    sendResponse(res, {
      message: "আজকের জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  }
  else {
    sendResponse(res, {
      message: "আজকের ডেলিভারি পাওয়া গেছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

const getAllDeliveryListController = catchAsync(async (req, res) => {
  const { limit, page, date, search } = await parseListQuery(req.query);
  const result = await DeliveryService.getAllDeliveryListService(
    { date, limit, page, search }
  );

  if (!result?.data?.length) {
    sendResponse(res, {
      message: "কোনো ডেলিভারি পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  }
  else {
    sendResponse(res, {
      message: "ডেলিভারি সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }

});

const createDeliveryController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await DeliveryService.createDeliveryService(body);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "ডেলিভারি তৈরি করা সম্ভব হয়নি।")
  } else {
    sendResponse(res, {
      message: "ডেলিভারি সফলভাবে তৈরি করা হয়েছে।",
      statusCode: StatusCodes.OK,
      success: !!result?.id,
    });
  }

});

const getTodaysDeliveryThatDoneController = catchAsync(async (req, res) => {
  const { limit, page, date } = await parseListQuery(req.query);
  const result = await DeliveryService.getTodaysDeliveryThatDone({ date, limit, page });
  if (!result?.data?.length) {
    sendResponse(res, {
      message: "আজকের জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  }
  else {
    sendResponse(res, {
      message: "আজকের ডেলিভারি পাওয়া গেছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE
const getSingleDeliveryController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DeliveryService.getSingleDeliveryService(Number(id));
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "কোনো ডেলিভারি পাওয়া যায়নি।")
  }
  else {
    sendResponse(res, {
      message:
        "ডেলিভারি পাওয়া গেছে",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const DeliveryController = {
  getNextDeliveryNoController,
  getDeliveryThatGoTodayController,
  createDeliveryController,
  getTodaysDeliveryThatDoneController,
  getAllDeliveryListController,
  getSingleDeliveryController,
};
