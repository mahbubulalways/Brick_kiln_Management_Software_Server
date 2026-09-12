import catchAsync from "../../../../utils/catchAsync";
import { sendResponse } from "../../../../utils/sendResponse";
import { AppError } from "../../../errors/ApplicationError";
import { YoutubeLinkService } from "./youtube.service";

const createYoutubeLinkController = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await YoutubeLinkService.createYoutubeLinkService(payload);

  if (!result) {
    throw new AppError(400, "ইউটিউব লিংক তৈরি করা যায়নি");
  }

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "ইউটিউব লিংক সফলভাবে তৈরি হয়েছে",
    data: result,
  });
});

const getAllYoutubeLinksController = catchAsync(async (req, res) => {
  const result = await YoutubeLinkService.getAllYoutubeLinksService();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "ইউটিউব লিংকগুলো সফলভাবে পাওয়া গেছে",
    data: result || [],
  });
});

const deleteYoutubeLinkController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await YoutubeLinkService.deleteYoutubeLinkService(id);

  if (!result) {
    throw new AppError(404, "ইউটিউব লিংক পাওয়া যায়নি");
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "ইউটিউব লিংক সফলভাবে ডিলিট হয়েছে",
    data: result,
  });
});

export const YoutubeLinkController = {
  createYoutubeLinkController,
  getAllYoutubeLinksController,
  deleteYoutubeLinkController,
};
