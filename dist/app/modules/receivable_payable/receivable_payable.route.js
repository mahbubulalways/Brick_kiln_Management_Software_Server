"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const receivable_payable_controller_1 = require("./receivable_payable.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), receivable_payable_controller_1.ReceivablePayableController.createReceivablePayableController);
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), receivable_payable_controller_1.ReceivablePayableController.getAllReceivablePayableController);
router.get("/single/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), receivable_payable_controller_1.ReceivablePayableController.getSingleReceivablePayableController);
router.get("/amount/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), receivable_payable_controller_1.ReceivablePayableController.getCurrentAmountController);
router.post("/transaction/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), receivable_payable_controller_1.ReceivablePayableController.createTransactionController);
exports.default = router;
