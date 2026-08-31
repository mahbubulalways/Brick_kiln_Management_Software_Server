"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vata_controller_1 = require("./vata.controller");
const AuthGuard_1 = __importDefault(require("../../../middlewares/AuthGuard"));
const enums_1 = require("../../../../generated/prisma/enums");
const router = (0, express_1.Router)();
// CREATE VATA
router.post('/create', (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), vata_controller_1.AdminVataController.createNewVataController);
// GET ALL VATA
router.get('/all', (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), vata_controller_1.AdminVataController.getAllVataController);
// GET ALL VATA
router.get('/inactive', (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), vata_controller_1.AdminVataController.getInactiveVataController);
// GET SINGLE VATA
router.get('/single/:id', (0, AuthGuard_1.default)(enums_1.UserRole.SUPER_ADMIN, enums_1.UserRole.SYSTEM_ADMIN), vata_controller_1.AdminVataController.getSingleVataController);
exports.default = router;
