import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";
import { sendResponse } from "../../../utils/sendResponse";
import { ActivityService } from "./activity.service";

const getAlActivityLogController = catchAsync(async (req, res) => {
  const { limit, page } = await parseListQuery(req.query);
  const user = req.user as TAuthUser;
  const result = await ActivityService.getAllActivityLogService(user, {
    limit,
    page,
  });

  if (!result?.data?.length) {
    sendResponse(res, {
      message: "কোনো অ্যাক্টিভিটি লগ পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "অ্যাক্টিভিটি লগগুলো সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const ActivityLogController = {
  getAlActivityLogController,
};
