"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../../middlewares/AuthGuard"));
const enums_1 = require("../../../../generated/prisma/enums");
const database_controller_1 = require("./database.controller");
const router = (0, express_1.Router)();
router.post("/backup", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), database_controller_1.DatabaseBackupController.createBackupController);
router.get("/backup", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), database_controller_1.DatabaseBackupController.getAllBackupController);
// BACKUP PERMISSIPN
router.get("/backup-permission", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), database_controller_1.DatabaseBackupController.getDatabaseBackupPermissionController);
router.post("/update-backup-permission", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), database_controller_1.DatabaseBackupController.databaseBackupPermissionController);
router.delete("/backup/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), database_controller_1.DatabaseBackupController.deleteBackupController);
exports.default = router;
