"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vata_controller_1 = require("./vata.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.get('/info', (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), vata_controller_1.VataController.getVataInformationController);
router.get('/me', (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), vata_controller_1.VataController.getMyVataInformationController);
router.get('/verify-domain/:id', vata_controller_1.VataController.checkSubdomainExistController);
exports.default = router;
