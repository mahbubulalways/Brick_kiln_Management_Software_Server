import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { DeliveryService } from "./delivery.service";
import { StatusCodes } from "http-status-codes";

const getNextDeliveryNoController = catchAsync(async (req, res) => {
  const result = await DeliveryService.getNextDeliveryNo();
  sendResponse(res, {
    message: "সফলভাবে পাওয়া গেছে।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});
const getDeliveryThatGoTodayController = catchAsync(async (req, res) => {
  const { date } = req.query;
  if (!date || typeof date !== "string") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "তারিখ প্রদান করা হয়নি বা তারিখের ফরম্যাট সঠিক নয়।"
    );
  }

  const result = await DeliveryService.getDeliveryThatGoTodayService(date);
  sendResponse(res, {
    message: result?.length
      ? "আজকের ডেলিভারি সফলভাবে পাওয়া গেছে।"
      : "আজকের জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

const getAllDeliveryListController = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;

  const result = await DeliveryService.getAllDeliveryListService(
    startDate as string,
    endDate as string
  );
  sendResponse(res, {
    message: result?.length
      ? " ডেলিভারি সফলভাবে পাওয়া গেছে।"
      : " জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

const createDeliveryController = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await DeliveryService.createDeliveryService(body);
  sendResponse(res, {
    message: result?.id
      ? "ডেলিভারি সফলভাবে তৈরি করা হয়েছে।"
      : "ডেলিভারি তৈরি করা সম্ভব হয়নি।",
    statusCode: StatusCodes.OK,
    success: !!result?.id,
    data: result,
  });
});

const getTodaysDeliveryThatDoneController = catchAsync(async (req, res) => {
  const { date } = req.query;
  if (!date || typeof date !== "string") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "তারিখ প্রদান করা হয়নি বা তারিখের ফরম্যাট সঠিক নয়।"
    );
  }
  const result = await DeliveryService.getTodaysDeliveryThatDone(date);
  sendResponse(res, {
    message: result?.length
      ? "আজকের ডেলিভারি পাওয়া গেছে"
      : "আজকের জন্য কোনো ডেলিভারি পাওয়া যায়নি।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

// GET SINGLE
const getSingleDeliveryController = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await DeliveryService.getSingleDeliveryService(Number(id));
  sendResponse(res, {
    message: result?.id
      ? "ডেলিভারি পাওয়া গেছে"
      : "কোনো ডেলিভারি পাওয়া যায়নি।",
    statusCode: StatusCodes.OK,
    success: true,
    data: result,
  });
});

export const DeliveryController = {
  getNextDeliveryNoController,
  getDeliveryThatGoTodayController,
  createDeliveryController,
  getTodaysDeliveryThatDoneController,
  getAllDeliveryListController,
  getSingleDeliveryController,
};
