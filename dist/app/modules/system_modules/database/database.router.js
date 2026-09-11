"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_controller_1 = require("./database.controller");
const router = (0, express_1.Router)();
router.get("/backup", 
// AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
database_controller_1.downloadDatabaseBackup);
exports.default = router;
