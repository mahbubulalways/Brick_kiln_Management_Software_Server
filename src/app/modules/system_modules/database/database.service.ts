import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { prisma } from "../../../../helpers/prisma";
import { DatabaseBackupType } from "../../../../generated/prisma/enums";
import { TQuery } from "../../../../interface/query";
import { paginationHelper } from "../../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../../utils/createMetaConfig";
const execFileAsync = promisify(execFile);

const BACKUP_DIR = path.join(process.cwd(), "uploads/database");

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

const getDatabaseStatistics = async () => {
  const tables = await prisma.$queryRaw<
    {
      tableName: string;
    }[]
  >`
        SELECT table_name AS "tableName"
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          AND table_name != 'DatabaseBackup'
        ORDER BY table_name;
    `;

  const tableRowCounts: Record<string, number> = {};
  let totalRowCount = 0;

  for (const table of tables) {
    const tableName = table.tableName;

    const result = await prisma.$queryRawUnsafe<
      {
        count: bigint;
      }[]
    >(`SELECT COUNT(*)::bigint AS count FROM "${tableName}"`);

    const rowCount = Number(result[0]?.count ?? 0);

    tableRowCounts[tableName] = rowCount;
    totalRowCount += rowCount;
  }

  return {
    tableCount: tables.length,
    totalRowCount,
    tableRowCounts,
  };
};

const createDatabaseBackup = async ({
  backupType,
}: {
  backupType: DatabaseBackupType;
}) => {
  let filePath = "";

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
    filePath = path.join(BACKUP_DIR, fileName);

    const databaseUrl = new URL(process.env.DATABASE_URL);

    const host = databaseUrl.hostname;
    const port = databaseUrl.port || "5432";

    const username = decodeURIComponent(databaseUrl.username);

    const password = decodeURIComponent(databaseUrl.password);

    const database = databaseUrl.pathname.replace(/^\//, "");

    if (!database) {
      throw new Error("Database name not found in DATABASE_URL");
    }

    const databaseStatistics = await getDatabaseStatistics();

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

    await execFileAsync("pg_dump", pgDumpArgs, {
      env: {
        ...process.env,
        PGPASSWORD: password,
      },
      maxBuffer: 1024 * 1024 * 50,
    });

    if (!fs.existsSync(filePath)) {
      throw new Error("Database backup file was not created");
    }

    const stats = fs.statSync(filePath);

    if (stats.size === 0) {
      fs.unlinkSync(filePath);

      throw new Error("Database backup file is empty");
    }

    const databaseBackup = await prisma.databaseBackup.create({
      data: {
        fileName,
        filePath,
        fileSize: BigInt(stats.size),
        type: backupType,
        tableCount: databaseStatistics.tableCount,
        totalRowCount: BigInt(databaseStatistics.totalRowCount),
        tableRowCounts: databaseStatistics.tableRowCounts,
      },
    });

    return {
      id: databaseBackup.id,
      fileName: databaseBackup.fileName,
      filePath: databaseBackup.filePath,
      fileSize: stats.size,
      type: databaseBackup.type,
      tableCount: databaseBackup.tableCount,
      totalRowCount: databaseStatistics.totalRowCount,
      tableRowCounts: databaseStatistics.tableRowCounts,
      createdAt: databaseBackup.createdAt,
    };
  } catch (error) {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to create database backup",
    );
  }
};

const getAllBackup = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total, summary] = await Promise.all([
    prisma.databaseBackup.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.databaseBackup.count({}),

    prisma.databaseBackup.aggregate({
      _sum: {
        fileSize: true,
        tableCount: true,
        totalRowCount: true,
      },
    }),
  ]);

  const format = result.map((backup) => ({
    id: backup.id,
    fileName: backup.fileName,
    filePath: backup.filePath,
    fileSize: backup.fileSize.toString(),
    type: backup.type,
    tableCount: backup.tableCount,
    totalRowCount: backup.totalRowCount.toString(),
    tableRowCounts: backup.tableRowCounts,
    createdAt: backup.createdAt,
  }));

  const meta = createMetaConfig({
    limit,
    page,
    totalData: total,
  });

  return {
    meta,
    data: format,
    summary: {
      totalBackup: total,
      totalFileSize: (summary._sum.fileSize ?? BigInt(0)).toString(),
      totalTableCount: summary._sum.tableCount ?? 0,
      totalRowCount: (summary._sum.totalRowCount ?? BigInt(0)).toString(),
    },
  };
};

const deleteBackup = async (id: string) => {
  const backup = await prisma.databaseBackup.findUnique({
    where: {
      id,
    },
  });

  if (!backup) {
    throw new Error("Backup পাওয়া যায়নি");
  }

  if (fs.existsSync(backup.filePath)) {
    fs.unlinkSync(backup.filePath);
  }

  const deletedBackup = await prisma.databaseBackup.delete({
    where: {
      id,
    },
  });

  return {
    id: deletedBackup.id,
    fileName: deletedBackup.fileName,
    filePath: deletedBackup.filePath,
    fileSize: deletedBackup.fileSize.toString(),
    type: deletedBackup.type,
    tableCount: deletedBackup.tableCount,
    totalRowCount: deletedBackup.totalRowCount.toString(),
    tableRowCounts: deletedBackup.tableRowCounts,
    createdAt: deletedBackup.createdAt,
  };
};

// PERMISSION=============================

const databaseBackupPermission = async (type: DatabaseBackupType) => {
  const existingPermission = await prisma.databaseBackupPermission.findFirst();

  if (existingPermission) {
    const result = await prisma.databaseBackupPermission.update({
      where: {
        id: existingPermission.id,
      },
      data: {
        type,
      },
    });

    return result;
  } else {
    const result = await prisma.databaseBackupPermission.create({
      data: {
        type,
      },
    });

    return result;
  }
};

const getDatabaseBackupPermission = async () => {
  const result = await prisma.databaseBackupPermission.findFirst();

  return result;
};

export const DatabaseBackupService = {
  getAllBackup,
  deleteBackup,
  createDatabaseBackup,
  databaseBackupPermission,
  getDatabaseBackupPermission,
};
