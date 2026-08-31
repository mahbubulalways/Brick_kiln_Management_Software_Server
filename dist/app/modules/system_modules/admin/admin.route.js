"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const AuthGuard_1 = __importDefault(require("../../../middlewares/AuthGuard"));
const enums_1 = require("../../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.get("/create", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN), admin_controller_1.AdminController.createAdminController);
exports.default = router;
