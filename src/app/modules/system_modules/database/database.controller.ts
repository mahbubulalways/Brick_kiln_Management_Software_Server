import { Request, Response } from "express";
import catchAsync from "../../../../utils/catchAsync";
import { DatabaseBackupService } from "./database.service";
import { sendResponse } from "../../../../utils/sendResponse";
import { DatabaseBackupType } from "../../../../generated/prisma/enums";
import { parseListQuery } from "../../../../utils/parseListQuery";
import { AppError } from "../../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

const createBackupController = catchAsync(async (req, res) => {
  const result = await DatabaseBackupService.createDatabaseBackup({
    backupType: DatabaseBackupType.MANUAL,
  });

  if (result) {
    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Database backup সফলভাবে তৈরি হয়েছে",
      data: result,
    });
  } else {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Database backup তৈরি করা যায়নি",
      data: null,
    });
  }
});

const getAllBackupController = catchAsync(async (req, res) => {
  const { limit, page } = await parseListQuery(req.query);
  const result = await DatabaseBackupService.getAllBackup({ limit, page });
  if (result && result.data.length > 0) {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Backup list সফলভাবে পাওয়া গেছে",
      data: result,
    });
  } else {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "কোনো backup পাওয়া যায়নি",
      data: [],
    });
  }
});

const deleteBackupController = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await DatabaseBackupService.deleteBackup(id);

  if (result) {
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Backup সফলভাবে delete হয়েছে",
      data: result,
    });
  } else {
    throw new AppError(StatusCodes.BAD_REQUEST, "Backup পাওয়া যায়নি");
  }
});

// BACKUP========================================
const databaseBackupPermissionController = catchAsync(
  async (req: Request, res: Response) => {
    const { type } = req.body;

    const result = await DatabaseBackupService.databaseBackupPermission(type);

    if (result) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Database backup permission সফলভাবে update হয়েছে",
        data: result,
      });
    } else {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Database backup permission update করা যায়নি",
        data: null,
      });
    }
  },
);

const getDatabaseBackupPermissionController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DatabaseBackupService.getDatabaseBackupPermission();

    if (result) {
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Database backup permission পাওয়া গেছে",
        data: result,
      });
    } else {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Database backup permission পাওয়া যায়নি",
        data: null,
      });
    }
  },
);

export const DatabaseBackupController = {
  createBackupController,
  getAllBackupController,
  deleteBackupController,
  databaseBackupPermissionController,
  getDatabaseBackupPermissionController,
};
