import { Request, Response } from "express";

import { ContactService } from "./contact.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

const createContactController = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.createContactService(req.body);

    if (result) {
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "ফোন নম্বর সফলভাবে যোগ করা হয়েছে",
            data: result,
        });
    } else {
        throw new Error("ফোন নম্বর যোগ করা যায়নি");
    }
});

const getAllContactController = catchAsync(async (req: Request, res: Response) => {
    const { limit, page, search } = await parseListQuery(req.query);
    const result = await ContactService.getAllContactService({ limit, page, search });

    if (result.data.length > 0) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "সকল ফোন নম্বর সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "কোনো ফোন নম্বর পাওয়া যায়নি",
            data: [],
        });
    }
});

const getSingleContactController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ContactService.getSingleContactService(id);

    if (result) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "ফোন নম্বর সফলভাবে পাওয়া গেছে",
            data: result,
        });
    } else {
        throw new Error("ফোন নম্বর পাওয়া যায়নি");
    }
});

const updateContactController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ContactService.updateContactService(
        id,
        req.body
    );

    if (result) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "ফোন নম্বর সফলভাবে আপডেট করা হয়েছে",
            data: result,
        });
    } else {
        throw new Error("ফোন নম্বর আপডেট করা যায়নি");
    }
});

const deleteContactController = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ContactService.deleteContactService(id);

    if (result) {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "ফোন নম্বর সফলভাবে মুছে ফেলা হয়েছে",
            data: result,
        });
    } else {
        throw new Error("ফোন নম্বর মুছে ফেলা যায়নি");
    }
});

export const ContactController = {
    createContactController,
    getAllContactController,
    getSingleContactController,
    updateContactController,
    deleteContactController,
};