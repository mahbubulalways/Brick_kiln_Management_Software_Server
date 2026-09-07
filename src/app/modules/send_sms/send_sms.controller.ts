import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { SendSmsService } from "./send_sms.service";
import { TAuthUser } from "../../../interface/token";

const getVatasSendMessageController = catchAsync(async (req, res) => {
  const user = req.user as TAuthUser;

  const result = await SendSmsService.getVatasSendMessageService(user);

  if (!result.length) {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "কোনো SMS বার্তা পাওয়া যায়নি।",
      data: [],
    });
  } else {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "SMS বার্তাগুলো সফলভাবে পাওয়া গেছে।",
      data: result,
    });
  }
});

export const SmsSendController = {
  getVatasSendMessageController,
};
