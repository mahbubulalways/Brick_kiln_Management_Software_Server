"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const backup_controller_1 = require("./backup.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = express_1.default.Router();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OPERATOR, enums_1.UserRole.OWNER), backup_controller_1.VataBackupController.createVataBackupController);
router.get("/", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OPERATOR, enums_1.UserRole.OWNER), backup_controller_1.VataBackupController.getVataBackupController);
exports.default = router;
