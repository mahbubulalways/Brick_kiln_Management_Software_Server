import { Request, Response } from "express";
import fs from "fs/promises";

import catchAsync from "../../../../utils/catchAsync";
import { createDatabaseBackup } from "./database.service";

export const downloadDatabaseBackup = catchAsync(
  async (req: Request, res: Response) => {
    const backup = await createDatabaseBackup();

    res.download(backup.filePath, backup.fileName, async (error) => {
      try {
        await fs.unlink(backup.filePath);
      } catch (deleteError) {
        console.error("Backup file delete error:", deleteError);
      }

      if (error) {
        console.error("Database backup download error:", error);
      }
    });
  },
);
