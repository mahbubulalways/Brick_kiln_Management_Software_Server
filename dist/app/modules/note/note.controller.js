"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = require("../../../utils/sendResponse");
const ApplicationError_1 = require("../../errors/ApplicationError");
const note_service_1 = require("./note.service");
const createNote = (0, catchAsync_1.default)(async (req, res) => {
    const result = await note_service_1.NoteService.createNoteService(req.body);
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "নোট তৈরি বা আপডেট করা যায়নি");
    }
    if (req.body.id) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "নোট সফলভাবে আপডেট হয়েছে",
            data: result,
        });
    }
    else {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "নোট সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
});
const getNotes = (0, catchAsync_1.default)(async (req, res) => {
    const result = await note_service_1.NoteService.getNoteService();
    if (!result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো নোট পাওয়া যায়নি",
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "নোট সফলভাবে পাওয়া গেছে",
        data: result,
    });
});
exports.NoteController = {
    createNote,
    getNotes,
};
