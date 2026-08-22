import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

export const getRoundController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser
  const result = await prisma.round.findMany({ where: { vataId: user.vataId } });
  if (!result.length) {
    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: false,
      message: "কোনো রাউন্ডের তথ্য পাওয়া যায়নি।",
      data: [],
    });
  }

  return sendResponse(res, {
    statusCode:  StatusCodes.OK,
    success: true,
    message: "রাউন্ডের তথ্য সফলভাবে পাওয়া গেছে।",
    data: result,
  });
});