import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ReportService } from "./report.service";

const getAllCustomertController = catchAsync(async (req, res) => {
    const result = await ReportService.getTopSellingAreasService();

    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো বিক্রয় তথ্য পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "এলাকাভিত্তিক বিক্রয় তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});


export const ReportController ={
    getAllCustomertController
}