"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/login", 
// VALIDATE_REQUEST(AUTH_LOGIN_VALIDATION),
auth_controller_1.AuthController.loginUserToSystemController);
router.post("/logout", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OWNER), auth_controller_1.AuthController.logoutController);
router.post("/change-password", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OWNER), auth_controller_1.AuthController.changePasswordController);
exports.default = router;
