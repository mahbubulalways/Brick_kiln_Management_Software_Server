"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const uploader_1 = require("../../../utils/uploader");
const enums_1 = require("../../../generated/prisma/enums");
const good_issue_controller_1 = require("./good_issue.controller");
const SubscriptionGuard_1 = __importDefault(require("../../middlewares/SubscriptionGuard"));
const router = (0, express_1.Router)();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, uploader_1.fileUploader.upload.single("file"), good_issue_controller_1.GoodIssueController.createGoodIssueController);
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_issue_controller_1.GoodIssueController.getAllGoodIssueController);
router.get("/history", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_issue_controller_1.GoodIssueController.getGoodIssueHistoryController);
router.get("/single/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_issue_controller_1.GoodIssueController.getSingleGoodIssueController);
exports.default = router;
