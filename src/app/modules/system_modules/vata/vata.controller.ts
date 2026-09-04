import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../../utils/catchAsync";
import { sendResponse } from "../../../../utils/sendResponse";
import { AppError } from "../../../errors/ApplicationError";
import { AdminVataService } from "./vata.service";

// CREATE NEW VATA CONTROLLER
const createNewVataController = catchAsync(async (req, res) => {
    const result = await AdminVataService.createNewVataService(req.body);

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "ভাটা সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ভাটা তৈরি করা যায়নি"
        );
    }
});

// GET ALL VATA
const getAllVataController = catchAsync(async (req, res) => {
    const result = await AdminVataService.getAllVataService();
    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো ভাটা পাওয়া যায়নি।",
            data: [],
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ভাটাগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// GET INACTIVE VATA
const getInactiveVataController = catchAsync(async (req, res) => {
    const result = await AdminVataService.getAllInactiveVataService();
    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো ভাটা পাওয়া যায়নি।",
            data: [],
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ভাটাগুলো সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});


// GET SINGLE VATA
const getSingleVataController = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await AdminVataService.getSingleVataService(id);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো ভাটা পাওয়া যায়নি।")
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ভাটা সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});


// GET SINGLE VATA
const getSingleVataInfoController = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await AdminVataService.getSingleVataInformationService(id);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো ভাটা পাওয়া যায়নি।")
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ভাটা সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// UPDATE VATA INFORMATION
const updateVataInfoController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const result = await AdminVataService.updateVataInfoService(
        id,
        body
    );

    if (!result) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ভাটার তথ্য আপডেট করা সম্ভব হয়নি।"
        );
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ভাটার তথ্য সফলভাবে আপডেট হয়েছে।",
        data: result,
    });
});


// UPDATE SUBSCRIPTION
const updateVataSubscriptionController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const result =
        await AdminVataService.updateVataSubscriptionService(
            id,
            body
        );

    if (!result) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ভাটার সাবস্ক্রিপশন আপডেট করা সম্ভব হয়নি।"
        );
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ভাটার সাবস্ক্রিপশন সফলভাবে আপডেট হয়েছে।",
        data: result,
    });
});

export const AdminVataController = {
    createNewVataController,
    getAllVataController,
    getSingleVataController,
    getInactiveVataController,
    getSingleVataInfoController,
    updateVataInfoController,
    updateVataSubscriptionController
}