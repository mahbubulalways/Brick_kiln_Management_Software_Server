"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("../../helpers/prisma");
const database_service_1 = require("../modules/system_modules/database/database.service");
const enums_1 = require("../../generated/prisma/enums");
const databaseBackupCron = () => {
    node_cron_1.default.schedule("0 0 * * *", async () => {
        try {
            const permission = await prisma_1.prisma.databaseBackupPermission.findFirst({
                where: {
                    type: enums_1.DatabaseBackupType.AUTO,
                },
            });
            if (!permission) {
                return;
            }
            await database_service_1.DatabaseBackupService.createDatabaseBackup({
                backupType: enums_1.DatabaseBackupType.AUTO,
            });
        }
        catch (error) {
            console.error("❌ Automatic database backup failed:", error);
        }
    }, {
        timezone: "Asia/Dhaka",
    });
    console.log("🕛 Database backup cron scheduled: Every day at 12:00 AM");
};
exports.default = databaseBackupCron;
