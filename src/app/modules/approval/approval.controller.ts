import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";
import { sendResponse } from "../../../utils/sendResponse";
import { ApprovalService } from "./approval.service";

const getAlApprovalController = catchAsync(async (req, res) => {
  const { limit, page } = await parseListQuery(req.query);
  const user = req.user as TAuthUser;
  const result = await ApprovalService.getAlApprovalService(user, {
    limit,
    page,
  });

  if (!result?.data?.length) {
    sendResponse(res, {
      message: "কোনো অনুমোদনের অনুরোধ পাওয়া যায়নি।",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "অনুমোদনের অনুরোধগুলো সফলভাবে পাওয়া গেছে।",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const ApprovalController = {
  getAlApprovalController,
};
