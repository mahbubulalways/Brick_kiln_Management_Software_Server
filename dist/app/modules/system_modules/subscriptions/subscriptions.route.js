"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../../middlewares/AuthGuard"));
const enums_1 = require("../../../../generated/prisma/enums");
const subscription_controller_1 = require("./subscription.controller");
const router = (0, express_1.Router)();
// CREATE NEW SUBSCRIPTION PLAN
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_controller_1.SubscriptionController.createSubscriptionPlanController);
// GET ALL SUBSCRIPTION PLAN
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_controller_1.SubscriptionController.getAllPaymentController);
// GET ALL SUBSCRIPTION PLAN OPTIONS
router.get("/options", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_controller_1.SubscriptionController.getAllSubscriptionPlanOptionsController);
// GET ALL SUBSCRIPTION PLAN OPTIONS
router.get("/single/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_controller_1.SubscriptionController.getSingleSubscriptionController);
// GET ALL SUBSCRIPTION PLAN OPTIONS
router.get("/vata-subscription/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_controller_1.SubscriptionController.getSingleVataSubscriptionController);
// UPDATE SINGLE SUBSCRIPTION PLAN
router.patch("/update/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), subscription_controller_1.SubscriptionController.updateSubscriptionController);
exports.default = router;
