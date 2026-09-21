import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { NoteService } from "./note.service";

const createNote = catchAsync(async (req, res) => {
  const result = await NoteService.createNoteService(req.body);

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "নোট তৈরি বা আপডেট করা যায়নি");
  }
  if (req.body.id) {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "নোট সফলভাবে আপডেট হয়েছে",
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "নোট সফলভাবে তৈরি হয়েছে",
      data: result,
    });
  }
});

const getNotes = catchAsync(async (req, res) => {
  const result = await NoteService.getNoteService();
  if (!result) {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "কোনো নোট পাওয়া যায়নি",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "নোট সফলভাবে পাওয়া গেছে",
    data: result,
  });
});

export const NoteController = {
  createNote,
  getNotes,
};
