"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseBackupService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const prisma_1 = require("../../../../helpers/prisma");
const paginationHelper_1 = require("../../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../../utils/createMetaConfig");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
const BACKUP_DIR = path_1.default.join(process.cwd(), "uploads/database");
const generateBackupFileName = () => {
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
    const tables = await prisma_1.prisma.$queryRaw `
        SELECT table_name AS "tableName"
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          AND table_name != 'DatabaseBackup'
        ORDER BY table_name;
    `;
    const tableRowCounts = {};
    let totalRowCount = 0;
    for (const table of tables) {
        const tableName = table.tableName;
        const result = await prisma_1.prisma.$queryRawUnsafe(`SELECT COUNT(*)::bigint AS count FROM "${tableName}"`);
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
const createDatabaseBackup = async ({ backupType, }) => {
    let filePath = "";
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not configured");
        }
        if (!fs_1.default.existsSync(BACKUP_DIR)) {
            fs_1.default.mkdirSync(BACKUP_DIR, {
                recursive: true,
            });
        }
        const fileName = generateBackupFileName();
        filePath = path_1.default.join(BACKUP_DIR, fileName);
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
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("Database backup file was not created");
        }
        const stats = fs_1.default.statSync(filePath);
        if (stats.size === 0) {
            fs_1.default.unlinkSync(filePath);
            throw new Error("Database backup file is empty");
        }
        const databaseBackup = await prisma_1.prisma.databaseBackup.create({
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
    }
    catch (error) {
        if (filePath && fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        throw new Error(error instanceof Error
            ? error.message
            : "Failed to create database backup");
    }
};
const getAllBackup = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total, summary] = await Promise.all([
        prisma_1.prisma.databaseBackup.findMany({
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.databaseBackup.count({}),
        prisma_1.prisma.databaseBackup.aggregate({
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
    const meta = (0, createMetaConfig_1.createMetaConfig)({
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
const deleteBackup = async (id) => {
    const backup = await prisma_1.prisma.databaseBackup.findUnique({
        where: {
            id,
        },
    });
    if (!backup) {
        throw new Error("Backup পাওয়া যায়নি");
    }
    if (fs_1.default.existsSync(backup.filePath)) {
        fs_1.default.unlinkSync(backup.filePath);
    }
    const deletedBackup = await prisma_1.prisma.databaseBackup.delete({
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
const databaseBackupPermission = async (type) => {
    const existingPermission = await prisma_1.prisma.databaseBackupPermission.findFirst();
    if (existingPermission) {
        const result = await prisma_1.prisma.databaseBackupPermission.update({
            where: {
                id: existingPermission.id,
            },
            data: {
                type,
            },
        });
        return result;
    }
    else {
        const result = await prisma_1.prisma.databaseBackupPermission.create({
            data: {
                type,
            },
        });
        return result;
    }
};
const getDatabaseBackupPermission = async () => {
    const result = await prisma_1.prisma.databaseBackupPermission.findFirst();
    return result;
};
exports.DatabaseBackupService = {
    getAllBackup,
    deleteBackup,
    createDatabaseBackup,
    databaseBackupPermission,
    getDatabaseBackupPermission,
};
