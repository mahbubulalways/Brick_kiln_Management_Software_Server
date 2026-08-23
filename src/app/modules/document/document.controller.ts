import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { DocumentService } from "./document.service";
import { TAuthUser } from "../../../interface/token";

const createFolderController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await DocumentService.createFolderService(
        user,
        req.body
    );

    if (result) {
        sendResponse(res, {
            message: "ফোল্ডারটি সফলভাবে তৈরি করা হয়েছে।",
            statusCode: StatusCodes.CREATED,
            success: true,
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডার তৈরি করা যায়নি।"
        );
    }
});

const updateFolderController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.user as TAuthUser;

    const result = await DocumentService.updateFolderNameService(
        user,
        id,
        req.body
    );

    if (result) {
        sendResponse(res, {
            message: "ফোল্ডারটি সফলভাবে আপডেট করা হয়েছে।",
            statusCode: StatusCodes.OK,
            success: true,
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডারটি পাওয়া যায়নি বা আপডেট করা যায়নি।"
        );
    }
});

const getAllDocumentsController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;
    const result = await DocumentService.getAllDocumentsService(user);

    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো ডকুমেন্ট পাওয়া যায়নি।",
            data: [],
        });

    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ডকুমেন্টসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    }
});

// GET SINGLE FOLDER NAME
const getSingleFolderController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = req.user as TAuthUser;

    const result = await DocumentService.getSingleFolderService(
        user,
        id
    );

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ফোল্ডারের তথ্য সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডারটি পাওয়া যায়নি।"
        );
    }
});

// GET EACH FOLDER DOCUMENTS
const getSingleDocumentController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;

    const result = await DocumentService.getSingleDocumentService(
        user,
        req.params.id
    );

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ডকুমেন্টসমূহ সফলভাবে পাওয়া গেছে।",
            data: result,
        });
    } else {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো ডকুমেন্ট পাওয়া যায়নি।",
            data: [],
        });
    }
});

// UPLOAD
const uploadDocumentController = catchAsync(async (req, res) => {
    const user = req.user as TAuthUser;

    const result = await DocumentService.uploadDocumentService(
        user,
        req
    );

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "ফাইল সফলভাবে আপলোড হয়েছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ফাইল আপলোড করা যায়নি।"
        );
    }
});

// DELETE DOCUMENT
const deleteDocumentController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = req.user as TAuthUser;

    const result = await DocumentService.deleteDocumentService(
        user,
        id
    );

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ফাইলটি সফলভাবে ডিলেট করা হয়েছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফাইলটি পাওয়া যায়নি বা ডিলেট করা যায়নি।"
        );
    }
});

// DELETE FOLDER
const deleteFolderController = catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = req.user as TAuthUser;

    const result = await DocumentService.deleteFolderService(
        user,
        id
    );

    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "ফোল্ডারটি সফলভাবে ডিলেট করা হয়েছে।",
            data: result,
        });
    } else {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডারটি পাওয়া যায়নি বা ডিলেট করা যায়নি।"
        );
    }
});

export const DocumentController = {
    createFolderController,
    getAllDocumentsController,
    uploadDocumentController,
    getSingleDocumentController,
    deleteDocumentController,
    updateFolderController,
    getSingleFolderController,
    deleteFolderController
}