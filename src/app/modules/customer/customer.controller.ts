import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { CustomerService } from "./customer.service";
import { parseListQuery } from "../../../utils/parseListQuery";
import { AppError } from "../../errors/ApplicationError";


// GET DATA FOR UPDATE
const getSingleCustomerInfoController = catchAsync(async (req, res) => {
    const result = await CustomerService.getSingleCustomerService(Number(req.params.id));
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।")
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// UPDATE
const updateCustomerInfoController = catchAsync(async (req, res) => {
    const result = await CustomerService.updateCustomerService(Number(req.params.id), req.body);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।")
    }
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "সফলভাবে আপডেট করেছে",
        data: result,
    });
});


// GET ALL CUSTOMER INFO
const getAllCustomertController = catchAsync(async (req, res) => {
    const { limit, page, search } = await parseListQuery(req.query);
    const result = await CustomerService.getAllCustomerService({ limit, page, search });
    if (!result || result.data.length === 0) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কাস্টমারদের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});


const getSingleCustomertController = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await CustomerService.getSingleCustomerInformationService(Number(id));
    if (!result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// GET CUSTOMER ALL CHALLANS
const getCustomertAllChallanController = catchAsync(async (req, res) => {
    const id = req.params.id
    const { limit, page, date } = await parseListQuery(req.query);
    const result = await CustomerService.getCustomerAllChallanService(Number(id), { date, limit, page });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// GET CUSTOMER ALL CHALLANS
const getCustomerAllDeliveryController = catchAsync(async (req, res) => {
    const id = req.params.id
    const { limit, page, date } = await parseListQuery(req.query);
    const result = await CustomerService.getCustomerAllDeliveryService(Number(id), { date, limit, page });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});


// GET CUSTOMER ALL DUES
const getCustomerAllDuesController = catchAsync(async (req, res) => {
    const id = req.params.id
    const { limit, page, date } = await parseListQuery(req.query);
    const result = await CustomerService.getCustomerAllDuesService(Number(id), { date, limit, page });
    if (!result.data.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো কাস্টমার পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "কাস্টমার তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});


export const CustomerController = {
    getAllCustomertController,
    getSingleCustomertController,
    getCustomertAllChallanController,
    getCustomerAllDeliveryController,
    getCustomerAllDuesController,
    getSingleCustomerInfoController,
    updateCustomerInfoController
}