"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseBackupController = void 0;
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const database_service_1 = require("./database.service");
const sendResponse_1 = require("../../../../utils/sendResponse");
const enums_1 = require("../../../../generated/prisma/enums");
const parseListQuery_1 = require("../../../../utils/parseListQuery");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
const createBackupController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await database_service_1.DatabaseBackupService.createDatabaseBackup({
        backupType: enums_1.DatabaseBackupType.MANUAL,
    });
    if (result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 201,
            success: true,
            message: "Database backup সফলভাবে তৈরি হয়েছে",
            data: result,
        });
    }
    else {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Database backup তৈরি করা যায়নি",
            data: null,
        });
    }
});
const getAllBackupController = (0, catchAsync_1.default)(async (req, res) => {
    const { limit, page } = await (0, parseListQuery_1.parseListQuery)(req.query);
    const result = await database_service_1.DatabaseBackupService.getAllBackup({ limit, page });
    if (result && result.data.length > 0) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Backup list সফলভাবে পাওয়া গেছে",
            data: result,
        });
    }
    else {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "কোনো backup পাওয়া যায়নি",
            data: [],
        });
    }
});
const deleteBackupController = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await database_service_1.DatabaseBackupService.deleteBackup(id);
    if (result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Backup সফলভাবে delete হয়েছে",
            data: result,
        });
    }
    else {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Backup পাওয়া যায়নি");
    }
});
// BACKUP========================================
const databaseBackupPermissionController = (0, catchAsync_1.default)(async (req, res) => {
    const { type } = req.body;
    const result = await database_service_1.DatabaseBackupService.databaseBackupPermission(type);
    if (result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Database backup permission সফলভাবে update হয়েছে",
            data: result,
        });
    }
    else {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Database backup permission update করা যায়নি",
            data: null,
        });
    }
});
const getDatabaseBackupPermissionController = (0, catchAsync_1.default)(async (req, res) => {
    const result = await database_service_1.DatabaseBackupService.getDatabaseBackupPermission();
    if (result) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Database backup permission পাওয়া গেছে",
            data: result,
        });
    }
    else {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Database backup permission পাওয়া যায়নি",
            data: null,
        });
    }
});
exports.DatabaseBackupController = {
    createBackupController,
    getAllBackupController,
    deleteBackupController,
    databaseBackupPermissionController,
    getDatabaseBackupPermissionController,
};
