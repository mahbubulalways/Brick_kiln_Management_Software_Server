"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const vata_sms_sittings_controller_1 = require("./vata_sms_sittings.controller");
const SubscriptionGuard_1 = __importDefault(require("../../middlewares/SubscriptionGuard"));
const router = (0, express_1.Router)();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, vata_sms_sittings_controller_1.VataSmsSettingsController.createOrUpdateVataSmsController);
router.get("/", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), vata_sms_sittings_controller_1.VataSmsSettingsController.getVataSmsSettingController);
exports.default = router;
