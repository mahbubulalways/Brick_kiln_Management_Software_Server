"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const sms_controller_1 = require("./sms.controller");
const router = (0, express_1.Router)();
router.post("/purchase", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), sms_controller_1.SmsController.purchaseManualSmsController);
router.get("/vata", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), sms_controller_1.SmsController.getMyVatarSmsReportController);
router.get("/purchase-history", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), sms_controller_1.SmsController.getSmspurchaseHistroyController);
// ADMIN
// MANUAL SMS REQUST
router.get("/admin/purchase-request", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), sms_controller_1.SmsController.getManualSmspurchaseRequestController);
// ALL SMS PAYMENT HISTIRY
router.get("/admin/payment-history", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), sms_controller_1.SmsController.getAllSmspurchaseHistoryController);
// UPDATE MANUAL STATUS
router.patch("/admin/update-status/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), sms_controller_1.SmsController.updateSmsPaymentStatusController);
exports.default = router;
