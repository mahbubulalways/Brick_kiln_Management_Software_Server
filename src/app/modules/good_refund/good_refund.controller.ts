import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { GoodRefundService } from "./good_refund.service";
import { sendResponse } from "../../../utils/sendResponse";

const createGoodIssueRefundController = catchAsync(async (req, res) => {
    const result = await GoodRefundService.createRefundGoodService(req);
    if (!result) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল ফেরত নেওয়া সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }

    sendResponse(res, {
        message: "মালামাল সফলভাবে ফেরত নেওয়া হয়েছে।",
        statusCode: StatusCodes.CREATED,
        success: true,
    });
});

export const GoodRefundController = {
    createGoodIssueRefundController
}