import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { uploadBackupToGoogleDrive } from "./database.drive";

const execFileAsync = promisify(execFile);

const BACKUP_DIR = path.join(process.cwd(), "backups");

const generateBackupFileName = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `brick-management-backup-${year}-${month}-${day}-${hours}-${minutes}-${seconds}.sql`;
};

export const createDatabaseBackup = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not configured");
    }

    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, {
        recursive: true,
      });
    }

    const fileName = generateBackupFileName();
    const filePath = path.join(BACKUP_DIR, fileName);

    const databaseUrl = new URL(process.env.DATABASE_URL);

    const host = databaseUrl.hostname;
    const port = databaseUrl.port || "5432";
    const username = decodeURIComponent(databaseUrl.username);
    const password = decodeURIComponent(databaseUrl.password);
    const database = databaseUrl.pathname.replace("/", "");

    if (!database) {
      throw new Error("Database name not found in DATABASE_URL");
    }

    const pgDumpArgs = [
      "--host",
      host,
      "--port",
      port,
      "--username",
      username,
      "--dbname",
      database,
      "--format",
      "plain",
      "--file",
      filePath,
      "--no-owner",
      "--no-privileges",
    ];

    const { stderr } = await execFileAsync("pg_dump", pgDumpArgs, {
      env: {
        ...process.env,
        PGPASSWORD: password,
      },
      maxBuffer: 1024 * 1024 * 50,
    });

    if (stderr && !fs.existsSync(filePath)) {
      throw new Error(stderr);
    }

    if (!fs.existsSync(filePath)) {
      throw new Error("Database backup file was not created");
    }

    const stats = fs.statSync(filePath);

    if (stats.size === 0) {
      fs.unlinkSync(filePath);

      throw new Error("Database backup file is empty");
    }

    const googleDriveBackup = await uploadBackupToGoogleDrive(
      filePath,
      fileName,
    );

    return {
      fileName,
      filePath,
      fileSize: stats.size,
      googleDrive: googleDriveBackup,
    };
  } catch (error) {
    console.error("Database backup error:", error);

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to create database backup",
    );
  }
};
