"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const document_service_1 = require("./document.service");
const createFolderController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await document_service_1.DocumentService.createFolderService(req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ফোল্ডার তৈরি করা যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "ফোল্ডারটি সফলভাবে তৈরি করা হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        data: result,
    });
});
const updateFolderController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await document_service_1.DocumentService.updateFolderNameService(id, req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ফোল্ডারটি পাওয়া যায়নি বা আপডেট করা যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        message: "ফোল্ডারটি সফলভাবে আপডেট করা হয়েছে।",
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        data: result,
    });
});
const getAllDocumentsController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await document_service_1.DocumentService.getAllDocumentsService();
    if (!result.length) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো ডকুমেন্ট পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ডকুমেন্টসমূহ সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET SINGLE FOLDER NAME
const getSingleFolderController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await document_service_1.DocumentService.getSingleFolderService(id);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ফোল্ডারটি পাওয়া যায়নি।");
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ফোল্ডারের তথ্য সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// GET EACH FOLDER DOCUMENTS
const getSingleDocumentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await document_service_1.DocumentService.getSingleDocumentService(req.params.id);
    if (!result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "কোনো ডকুমেন্ট পাওয়া যায়নি।",
            data: [],
        });
        return;
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "ডকুমেন্টসমূহ সফলভাবে পাওয়া গেছে।",
        data: result,
    });
});
// UPLOAD
const uploadDocumentController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await document_service_1.DocumentService.uploadDocumentService(req);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "ফাইল সফলভাবে আপলোড হয়েছে।",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "ফাইল আপলোড করা যায়নি।");
    }
});
// DELETE 
const deleteDocumentController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await document_service_1.DocumentService.deleteDocumentService(id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ফাইলটি সফলভাবে ডিলেট করা হয়েছে।",
        });
    }
});
// DELETE FOLDER
const deleteFolderController = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await document_service_1.DocumentService.deleteFolderService(id);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "ফাইলটি সফলভাবে ডিলেট করা হয়েছে।",
        });
    }
});
exports.DocumentController = {
    createFolderController,
    getAllDocumentsController,
    uploadDocumentController,
    getSingleDocumentController,
    deleteDocumentController,
    updateFolderController,
    getSingleFolderController,
    deleteFolderController
};
