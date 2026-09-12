"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faq_controller_1 = require("./faq.controller");
const AuthGuard_1 = __importDefault(require("../../../middlewares/AuthGuard"));
const enums_1 = require("../../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), faq_controller_1.FaqController.createFaq);
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER, enums_1.UserRole.SYSTEM_ADMIN, enums_1.UserRole.SUPER_ADMIN), faq_controller_1.FaqController.getFaq);
router.patch("/update/:id", (0, AuthGuard_1.default)(enums_1.UserRole.SYSTEM_ADMIN, enums_1.UserRole.SUPER_ADMIN), faq_controller_1.FaqController.updateFaq);
exports.default = router;
