import { StatusCodes } from "http-status-codes";

import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { VataService } from "./vata.service";
import { AppError } from "../../errors/ApplicationError";
import { TAuthUser } from "../../../interface/token";


// GET SUBDOMAIN EXITS OR NOT
const checkSubdomainExistController = catchAsync(async (req, res) => {
    const result = await VataService.checkSubdomainExistService(req.params.id);

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ডোমেইনটি সফলভাবে যাচাই করা হয়েছে",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ডোমেইনটি যাচাই করা যায়নি"
        );
    }
});


const getVataInformationController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await VataService.getVataInformationService(user);
    if (result?.id) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ভাটার তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ভাটার তথ্য পাওয়া যায়নি"
        );
    }
});



// CREATE NEW VATA CONTROLLER
const getMyVataInformationController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await VataService.getMyVataInformationService(user);
    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "ভাটার তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ভাটার তথ্য পাওয়া যায়নি"
        );
    }
});

// GET MY NAVBAR FEATURES
const getMyVataNavbarFeaturesController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await VataService.getMyVataNavbarFeaturesService(user);
    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "ভাটার তথ্য সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ভাটার তথ্য পাওয়া যায়নি"
        );
    }
});


export const VataController = {
    checkSubdomainExistController,
    getVataInformationController,
    getMyVataInformationController,
    getMyVataNavbarFeaturesController
};