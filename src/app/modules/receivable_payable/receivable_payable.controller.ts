import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { ReceivablePayableService } from "./receivable_payable.service";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";


// ==========================================
// Create Receivable / Payable
// ==========================================
const createReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await ReceivablePayableService.createReceivablePayable(
                req.body
            );
        if (!result) {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "সঠিক transactionType প্রদান করুন"
            );
        }
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
);

// ==========================================
// Create Transaction
// ==========================================
const createTransactionController = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id
        const result =
            await ReceivablePayableService.createTransaction(id, req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
);

// ==========================================
// Get All 
// ==========================================
const getAllReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await ReceivablePayableService.getAllReceivablePayable();
        if (!result.length) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "কোনো লেনদেনের হিসাব পাওয়া যায়নি"
            );
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "দেওয়া লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
);



// ==========================================
// Get Single Receivable / Payable
// ==========================================
const getSingleReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await ReceivablePayableService.getSingleReceivablePayable(
                req.params.id
            );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
);

// ==========================================
// Update Receivable / Payable
// ==========================================
const updateReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await ReceivablePayableService.updateReceivablePayable(
                req.params.id,
                req.body
            );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে আপডেট হয়েছে",
            data: result,
        });
    }
);

// ==========================================
// Delete Receivable / Payable
// ==========================================
const deleteReceivablePayableController = catchAsync(
    async (req: Request, res: Response) => {
        const result =
            await ReceivablePayableService.deleteReceivablePayable(
                req.params.id
            );

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "লেনদেনের হিসাব সফলভাবে মুছে ফেলা হয়েছে",
            data: result,
        });
    }
);

export const ReceivablePayableController = {
    createReceivablePayableController,
    createTransactionController,
    getAllReceivablePayableController,
    getSingleReceivablePayableController,
    updateReceivablePayableController,
    deleteReceivablePayableController,
};



// const getAllGivenController = catchAsync(
//     async (req: Request, res: Response) => {
//         const result =
//             await ReceivablePayableService.getAllGivenService();
//         if (!result.length) {
//             throw new AppError(
//                 StatusCodes.NOT_FOUND,
//                 "কোনো লেনদেনের হিসাব পাওয়া যায়নি"
//             );
//         }
//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "দেওয়া লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
//             data: result,
//         });
//     }
// );

// // ==========================================
// // Get All TAKEN
// // ==========================================
// const getAllTakenController = catchAsync(
//     async (req: Request, res: Response) => {
//         const result =
//             await ReceivablePayableService.getAllTakenService();

//         sendResponse(res, {
//             statusCode: 200,
//             success: true,
//             message: "নেওয়া লেনদেনের হিসাব সফলভাবে পাওয়া গেছে",
//             data: result,
//         });
//     }
// );