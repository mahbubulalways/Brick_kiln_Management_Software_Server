"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const subscription_payment_controller_1 = require("./subscription_payment.controller");
const router = (0, express_1.Router)();
// CREATE NEW SUBSCRIPTION PAYMENT
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), subscription_payment_controller_1.SubscriptionPaymentController.createNewSubscriptionPaymentController);
// GET ALL PENDING SUBSCRIPTION PAYMENT
// SYSTEM ADMIN
router.get("/pending", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_payment_controller_1.SubscriptionPaymentController.getAllSubscriptionPaymentController);
// GET ALL PAID SUBSCRIPTION PAYMENT
// SYSTEM ADMIN
router.get("/paid", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_payment_controller_1.SubscriptionPaymentController.getAllPaidSubscriptionController);
// GET OTHER SUBSCRIPTION PAYMENT
// SYSTEM ADMIN
router.get("/other", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_payment_controller_1.SubscriptionPaymentController.getOtherSubscriptionController);
// GET VATA SUBSCRIPTION PAYMENT HISTORY
router.get("/history", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), subscription_payment_controller_1.SubscriptionPaymentController.getVataSubscriptionPaymentHistoryController);
// UPDATE SUBSCRIPTION PAYMENT STATUS
// SYSTEM ADMIN
router.patch("/update-status/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_payment_controller_1.SubscriptionPaymentController.updateSubscriptionPaymentControllerStatus);
exports.default = router;
