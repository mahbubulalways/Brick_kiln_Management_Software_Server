"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const sendResponse_1 = require("../../../../utils/sendResponse");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const createAdminController = (0, catchAsync_1.default)(async (req, res) => {
    const data = {
        name: "System Admin",
        username: "systemadmin",
        password: "12345678"
    };
    const result = await admin_service_1.AdminService.createSuperAdminService(data);
    if (result) {
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "অ্যাডমিন সফলভাবে তৈরি হয়েছে",
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অ্যাডমিন তৈরি করা যায়নি");
    }
});
exports.AdminController = {
    createAdminController,
};
