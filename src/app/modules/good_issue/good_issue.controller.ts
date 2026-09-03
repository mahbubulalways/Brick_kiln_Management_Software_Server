import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { GoodIssueService } from "./good_issue.service";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

const createGoodIssueController = catchAsync(async (req, res) => {
    const result = await GoodIssueService.createGoodIssueService(req);
    if (!result.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল ইস্যু করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }

    sendResponse(res, {
        message: "মালামাল সফলভাবে ইস্যু হয়েছে।",
        statusCode: StatusCodes.CREATED,
        success: true,
    });
});

// GET ALL 
const getAllGoodIssueController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodIssueService.getAllGoodIssueService(user);

        if (result.length) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "মালামাল সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো মালামাল পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);

// GET SINLE
const getSingleGoodIssueController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const user = req.user as TAuthUser;
        const result =
            await GoodIssueService.getSingleGoodIssueService(
                user,
                id
            );
        if (!result) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "মালামালের ক্যাটাগরি পাওয়া যায়নি।"
            );
        }
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "মালামালের ক্যাটাগরি সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
);


// GET ISSUE HISTORY
const getGoodIssueHistoryController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const { limit, page } = await parseListQuery(req.query);
        const result =
            await GoodIssueService.getGoodsIssueHistoryLogs(user,{limit, page});

        if (result.data.length) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "মালামাল সফলভাবে পাওয়া গেছে।",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "কোনো মালামাল পাওয়া যায়নি।",
                data: [],
            });
        }
    }
);



export const GoodIssueController = {
    createGoodIssueController,
    getAllGoodIssueController,
    getSingleGoodIssueController,
    getGoodIssueHistoryController
}