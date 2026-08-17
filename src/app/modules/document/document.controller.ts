import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { AppError } from "../../errors/ApplicationError";
import { DocumentService } from "./document.service";

const createFolderController = catchAsync(async (req, res) => {
    const result = await DocumentService.createFolderService(req.body);

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডার তৈরি করা যায়নি।"
        );
    }
    sendResponse(res, {
        message: "ফোল্ডারটি সফলভাবে তৈরি করা হয়েছে।",
        statusCode: StatusCodes.CREATED,
        success: true,
        data: result,
    });
});

const updateFolderController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await DocumentService.updateFolderNameService(
        id,
        req.body
    );

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডারটি পাওয়া যায়নি বা আপডেট করা যায়নি।"
        );
    }

    sendResponse(res, {
        message: "ফোল্ডারটি সফলভাবে আপডেট করা হয়েছে।",
        statusCode: StatusCodes.OK,
        success: true,
        data: result,
    });
});

const getAllDocumentsController = catchAsync(async (req, res) => {
    const result = await DocumentService.getAllDocumentsService();

    if (!result.length) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো ডকুমেন্ট পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ডকুমেন্টসমূহ সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// GET SINGLE FOLDER NAME
const getSingleFolderController = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await DocumentService.getSingleFolderService(id);

    if (!result) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ফোল্ডারটি পাওয়া যায়নি।"
        );
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ফোল্ডারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// GET EACH FOLDER DOCUMENTS
const getSingleDocumentController = catchAsync(async (req, res) => {
    const result = await DocumentService.getSingleDocumentService(req.params.id);
    if (!result) {
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "কোনো ডকুমেন্ট পাওয়া যায়নি।",
            data: [],
        });

        return;
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "ডকুমেন্টসমূহ সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});

// UPLOAD
const uploadDocumentController = catchAsync(async (req, res) => {
    const result = await DocumentService.uploadDocumentService(req);
    if (result) {
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "ফাইল সফলভাবে আপলোড হয়েছে।",
        });
    } else {
        throw new AppError(
            StatusCodes.BAD_REQUEST,
            "ফাইল আপলোড করা যায়নি।"
        );
    }

});

// DELETE 

const deleteDocumentController = catchAsync(
    async (req, res) => {
        const id =req.params.id;

        const result =
            await DocumentService.deleteDocumentService(id);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "ফাইলটি সফলভাবে ডিলেট করা হয়েছে।",
            });
        }
    }
);

// DELETE FOLDER
const deleteFolderController = catchAsync(
    async (req, res) => {
        const id =req.params.id;
        const result =
            await DocumentService.deleteFolderService(id);

        if (result) {
            sendResponse(res, {
                statusCode: StatusCodes.OK,
                success: true,
                message: "ফাইলটি সফলভাবে ডিলেট করা হয়েছে।",
            });
        }
    }
);
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