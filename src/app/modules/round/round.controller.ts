import { prisma } from "../../../helpers/prisma";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

export const getRoundController = catchAsync(async (req, res) => {
  const result = await prisma.round.findMany({});
  if (!result.length) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "কোনো রাউন্ডের তথ্য পাওয়া যায়নি।",
      data: [],
    });
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "রাউন্ডের তথ্য সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});