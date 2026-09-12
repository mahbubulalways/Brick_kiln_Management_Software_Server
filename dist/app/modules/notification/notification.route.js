"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const notification_controller_1 = require("./notification.controller");
const ActiveSeasonGuard_1 = __importDefault(require("../../middlewares/ActiveSeasonGuard"));
const router = (0, express_1.Router)();
router.get("/unread", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OWNER), ActiveSeasonGuard_1.default, notification_controller_1.NotificationController.getUnreadNotificationsNumber);
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OWNER), ActiveSeasonGuard_1.default, notification_controller_1.NotificationController.getAllNotification);
router.patch("/update/:id", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.OWNER), notification_controller_1.NotificationController.updateNotification);
exports.default = router;
