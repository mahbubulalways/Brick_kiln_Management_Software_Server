import catchAsync from "../../../../utils/catchAsync";
import { sendResponse } from "../../../../utils/sendResponse";
import { AppError } from "../../../errors/ApplicationError";
import { HelpLineService } from "./helpline.service";

const createOrUpdateHelplineController = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await HelpLineService.createOrUpdateHelplineService(payload);
  if (!result) {
    throw new AppError(400, "হেল্পলাইন তথ্য সংরক্ষণ করা যায়নি");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "হেল্পলাইন তথ্য সফলভাবে সংরক্ষণ করা হয়েছে",
    data: result,
  });
});

const getHelplineController = catchAsync(async (req, res) => {
  const result = await HelpLineService.getHelplineService();
  if (!result) {
    throw new AppError(404, "হেল্পলাইন তথ্য পাওয়া যায়নি");
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "হেল্পলাইন তথ্য পাওয়া গেছে",
    data: result,
  });
});

export const HelpLineController = {
  createOrUpdateHelplineController,
  getHelplineController,
};
