"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enums_1 = require("../../../generated/prisma/enums");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const activity_controller_1 = require("./activity.controller");
const router = (0, express_1.Router)();
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.OWNER, enums_1.UserRole.OPERATOR, enums_1.UserRole.MANAGER), activity_controller_1.ActivityLogController.getAlActivityLogController);
exports.default = router;
