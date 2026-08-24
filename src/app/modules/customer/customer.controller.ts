import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { CustomerService } from "./customer.service";
import { parseListQuery } from "../../../utils/parseListQuery";
import { AppError } from "../../errors/ApplicationError";
import { TAuthUser } from "../../../interface/token";


// GET DATA FOR UPDATE
const getSingleCustomerInfoController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser
    const result = await CustomerService.getSingleCustomerService(user, req.params.id);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।")
    }
    else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// UPDATE
const updateCustomerInfoController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser
    const result = await CustomerService.updateCustomerService(user, req.params.id, req.body);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।")
    }
    else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "সফলভাবে আপডেট করেছে",
            data: result,
        });
    }
});


// GET ALL CUSTOMER INFO
const getAllCustomertController = catchAsync(async (req, res) => {
    const { limit, page, search } = await parseListQuery(req.query);
    const seasonId = req.seasonId
    const user = req.user as TAuthUser
    const result = await CustomerService.getAllCustomerService(user,seasonId, { limit, page, search });
    if (!result || result.data.length === 0) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }
    else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }

});


const getSingleCustomertController = catchAsync(async (req, res) => {
    const id = req.params.id
    const user = req.user as TAuthUser
    const result = await CustomerService.getSingleCustomerInformationService(user, id);
    if (!result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }
    else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// GET CUSTOMER ALL CHALLANS
const getCustomertAllChallanController = catchAsync(async (req, res) => {
    const id = req.params.id
    const user = req.user as TAuthUser
    const { limit, page, date } = await parseListQuery(req.query);
    const result = await CustomerService.getCustomerAllChallanService(user, id, { date, limit, page });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// GET CUSTOMER ALL CHALLANS
const getCustomerAllDeliveryController = catchAsync(async (req, res) => {
    const id = req.params.id
    const { limit, page, date } = await parseListQuery(req.query);
    const user = req.user as TAuthUser
    const result = await CustomerService.getCustomerAllDeliveryService(user, id, { date, limit, page });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});


// GET CUSTOMER ALL DUES
const getCustomerAllDuesController = catchAsync(async (req, res) => {
    const id = req.params.id
    const { limit, page, date } = await parseListQuery(req.query);
    const user = req.user as TAuthUser
    const result = await CustomerService.getCustomerAllDuesService(user, id, { date, limit, page });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});


//  GET OLD CUSTOMER
const getOldCustomerController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser
    const { search } = await parseListQuery(req.query)
    const result = await CustomerService.getOldCustomerService(user, search)
    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }
    else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});





export const CustomerController = {
    getAllCustomertController,
    getSingleCustomertController,
    getCustomertAllChallanController,
    getCustomerAllDeliveryController,
    getCustomerAllDuesController,
    getSingleCustomerInfoController,
    updateCustomerInfoController,
    getOldCustomerController,
}