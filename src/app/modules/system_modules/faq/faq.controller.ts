import { Request, Response } from "express";

import { FaqService } from "./faq.service";
import catchAsync from "../../../../utils/catchAsync";
import { sendResponse } from "../../../../utils/sendResponse";

const createFaq = catchAsync(async (req, res) => {
  const result = await FaqService.crateFaqService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "FAQ তৈরি করা হয়েছে",
    data: result,
  });
});

const getFaq = catchAsync(async (req, res) => {
  const result = await FaqService.getFaqService();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "FAQ পাওয়া গেছে",
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FaqService.updateFaqService(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "FAQ আপডেট করা হয়েছে",
    data: result,
  });
});

export const FaqController = {
  createFaq,
  getFaq,
  updateFaq,
};
