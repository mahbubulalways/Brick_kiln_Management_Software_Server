import { Request, Response } from "express";

import catchAsync from "../../../../utils/catchAsync";
import { sendResponse } from "../../../../utils/sendResponse";

import { AboutUsService } from "./about_us.service";

const createAboutUsController = catchAsync(async (req, res) => {
  const result = await AboutUsService.createAboutUsService(req.body);

  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "আমাদের সম্পর্কে তথ্য সফলভাবে সংরক্ষণ করা হয়েছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "আমাদের সম্পর্কে তথ্য সংরক্ষণ করা যায়নি",
      data: null,
    });
  }
});

const getAboutUsController = catchAsync(async (req, res) => {
  const result = await AboutUsService.getAboutUsService();

  if (result) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "আমাদের সম্পর্কে তথ্য সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "আমাদের সম্পর্কে কোনো তথ্য পাওয়া যায়নি",
      data: null,
    });
  }
});

export const AboutUsController = {
  createAboutUsController,
  getAboutUsController,
};
