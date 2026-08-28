
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { parseListQuery } from "../../../utils/parseListQuery";
import { sendResponse } from "../../../utils/sendResponse";
import { DriverService } from "./driver.service";

// ড্রাইভার তৈরি
const createDriverController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser
        const result = await DriverService.createDriverService(
            user,
            req.body
        );

        if (result) {
            sendResponse(res, {
                statusCode: 201,
                success: true,
                message: "ড্রাইভার সফলভাবে তৈরি হয়েছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: 400,
                success: false,
                message: "ড্রাইভার তৈরি করা যায়নি",
                data: null,
            });
        }
    }
);

// সকল ড্রাইভার পাওয়া
const getAllDriversController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser
          const { limit, page, search } = await parseListQuery(req.query);
        const result = await DriverService.getAllDriversService(user,{limit,page,search});

        if (result && result.data.length > 0) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "সকল ড্রাইভার সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "কোনো ড্রাইভার পাওয়া যায়নি",
                data: [],
            });
        }
    }
);

// নির্দিষ্ট ড্রাইভার পাওয়া
const getSingleDriverController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const user = req.user as TAuthUser
        const result = await DriverService.getSingleDriverService(
            user,
            id
        );

        if (result) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "ড্রাইভারের তথ্য সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "ড্রাইভার খুঁজে পাওয়া যায়নি",
                data: null,
            });
        }
    }
);

// ড্রাইভার আপডেট
const updateDriverController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const user = req.user as TAuthUser
        const result = await DriverService.updateDriverService(
            user,
            id,
            req.body
        );

        if (result) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "ড্রাইভারের তথ্য সফলভাবে আপডেট হয়েছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "ড্রাইভার খুঁজে পাওয়া যায়নি",
                data: null,
            });
        }
    }
);

// ড্রাইভার ডিলিট
const deleteDriverController = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const user = req.user as TAuthUser
        const result = await DriverService.deleteDriverService(
            user,
            id
        );

        if (result === null) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "ড্রাইভার সফলভাবে মুছে ফেলা হয়েছে",
                data: null,
            });
        } else {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: "ড্রাইভার মুছে ফেলা যায়নি",
                data: null,
            });
        }
    }
);



// GET OPTIONS
const driverOptionsForDeliverController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser
        const result = await DriverService.driverOptionsForDeliveryService(user);

        if (result && result.length > 0) {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "সকল ড্রাইভার সফলভাবে পাওয়া গেছে",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: 200,
                success: true,
                message: "কোনো ড্রাইভার পাওয়া যায়নি",
                data: [],
            });
        }
    }
);


export const DriverController = {
    createDriverController,
    getAllDriversController,
    getSingleDriverController,
    updateDriverController,
    deleteDriverController,
    driverOptionsForDeliverController
};