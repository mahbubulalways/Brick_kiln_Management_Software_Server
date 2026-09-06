import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ReportService } from "./report.service";
import { TAuthUser } from "../../../interface/token";

const getAllCustomertController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser
    const result = await ReportService.getTopSellingAreasService(user);
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


const dashboardAllReportController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser
    const seasonId = req.seasonId
    const result = await ReportService.dashboardAllReportService(user, seasonId);

    if (!result) {
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


const getLoadUnloadReportController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser
    const seasonId =req.seasonId
    const result = await ReportService.getLoadUnloadReportService(user);
    if (!result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো বিক্রয় তথ্য পাওয়া যায়নি।",
            data: {},
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


export const ReportController = {
    getAllCustomertController,
    dashboardAllReportController,
    getLoadUnloadReportController
}