"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const uploader_1 = require("../../../utils/uploader");
const good_refund_controller_1 = require("./good_refund.controller");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), uploader_1.fileUploader.upload.single("file"), good_refund_controller_1.GoodRefundController.createGoodIssueRefundController);
exports.default = router;
