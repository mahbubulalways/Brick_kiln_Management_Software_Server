import { StatusCodes } from "http-status-codes";
import { TAuthUser } from "../../../interface/token";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../errors/ApplicationError";
import { sendResponse } from "../../../utils/sendResponse";
import { GoodStockService } from "./good_stock.service";

// CREATE GOODS STOCK  CONTROLLER
const createGoodStockController = catchAsync(async (req, res) => {
    const result = await GoodStockService.createGoodStockService(
        req
    );
    if (!result.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল স্টকে যোগ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    } else {
        sendResponse(res, {
            message: "মালামাল সফলভাবে স্টকে যোগ হয়েছে।",
            statusCode: StatusCodes.CREATED,
            success: true,
        });

    }
});


// GET ALL 
const getAllGoodStockController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodStockService.getAllGoodStockService(user);

        if (result.length > 0) {
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

const getSingleGoodStockController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const id = req.params.id;
    const result = await GoodStockService.getSingleGoodStockService(
        user,
        id
    );
    if (!result?.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল লসের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }
    sendResponse(res, {
        message: "মালামাল লসের তথ্য সফলভাবে পাওয়া গেছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});


// GET SINGLE FOR UPDATE
const getSingleGoodStockInfoForUpdateController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const id = req.params.id;
    const result = await GoodStockService.getSingleGoodStockInfoForUpdateService(
        user,
        id
    );
    if (!result?.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল লসের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }
    sendResponse(res, {
        message: "মালামাল লসের তথ্য সফলভাবে পাওয়া গেছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});


// GET OPTIONS 
const getGoodStockOptionsController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodStockService.getGoodStockOptionsService(user);

        if (result.length > 0) {
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


// GET DEMAGE ITEMS
const getDemageController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodStockService.getDemageGoodService(user);

        if (result) {
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


// GET DEMAGE ITEMS
const getLostController = catchAsync(
    async (req, res) => {
        const user = req.user as TAuthUser;
        const result =
            await GoodStockService.getLostGoodService(user);

        if (result) {
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

// GET SINGLE GOOD LOSS
const getSingleGoodLossController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const id = req.params.id;
    const result = await GoodStockService.getSingleGoodLossService(
        user,
        id
    );
    if (!result?.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল লসের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }
    sendResponse(res, {
        message: "মালামাল লসের তথ্য সফলভাবে পাওয়া গেছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});

// UPDATE GOOD LOSS

const updateGoodLossController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const body = req.body;
    const id = req.params.id;

    const result = await GoodStockService.updateGoodLossService(
        user,
        id,
        body
    );

    if (!result?.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল যোগ করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }

    sendResponse(res, {
        message: "মালামাল সফলভাবে যোগ করা হয়েছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});


// DELETE
const deleteGoodStockController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const id = req.params.id;
    const result = await GoodStockService.deleteGoodStockService(
        user,
        id
    );
    if (!result?.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামাল মুছে ফেলা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }
    sendResponse(res, {
        message: "মালামাল সফলভাবে মুছে ফেলা হয়েছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});


// UPDATE GOOD STOCK
const updateGoodStockController = catchAsync(async (req, res) => {
    const result = await GoodStockService.updateGoodStockService(req);

    if (!result?.id) {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "মালামালের তথ্য আপডেট করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
    }

    sendResponse(res, {
        message: "মালামালের তথ্য সফলভাবে আপডেট হয়েছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});
export const GoodStockController = {
    createGoodStockController,
    getAllGoodStockController,
    getGoodStockOptionsController,
    getDemageController,
    getLostController,
    updateGoodLossController,
    getSingleGoodLossController,
    deleteGoodStockController,
    getSingleGoodStockController,
    getSingleGoodStockInfoForUpdateController,
    updateGoodStockController
}