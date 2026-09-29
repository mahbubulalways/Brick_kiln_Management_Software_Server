"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const approval_controller_1 = require("./approval.controller");
const ActiveSeasonGuard_1 = __importDefault(require("../../middlewares/ActiveSeasonGuard"));
const router = (0, express_1.Router)();
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.OWNER), approval_controller_1.ApprovalController.getAlApprovalController);
router.patch("/update-status/:id", (0, AuthGuard_1.default)(enums_1.UserRole.ADMIN, enums_1.UserRole.OWNER), ActiveSeasonGuard_1.default, approval_controller_1.ApprovalController.changeApprovalStatusController);
exports.default = router;
