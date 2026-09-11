"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadDatabaseBackup = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const catchAsync_1 = __importDefault(require("../../../../utils/catchAsync"));
const database_service_1 = require("./database.service");
exports.downloadDatabaseBackup = (0, catchAsync_1.default)(async (req, res) => {
    const backup = await (0, database_service_1.createDatabaseBackup)();
    res.download(backup.filePath, backup.fileName, async (error) => {
        try {
            await promises_1.default.unlink(backup.filePath);
        }
        catch (deleteError) {
            console.error("Backup file delete error:", deleteError);
        }
        if (error) {
            console.error("Database backup download error:", error);
        }
    });
});
