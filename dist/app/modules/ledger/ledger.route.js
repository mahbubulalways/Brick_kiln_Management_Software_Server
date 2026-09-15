"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ledger_controller_1 = require("./ledger.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const ActiveSeasonGuard_1 = __importDefault(require("../../middlewares/ActiveSeasonGuard"));
const SubscriptionGuard_1 = __importDefault(require("../../middlewares/SubscriptionGuard"));
const router = (0, express_1.Router)();
router.get("/count", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ledger_controller_1.LedgerController.getLedgerCountController);
// ==================== LEDGER OPTIONS ====================
router.get("/options", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, ledger_controller_1.LedgerController.getLedgerOptionController);
// ==================== GET ALL LEDGER ====================
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, ledger_controller_1.LedgerController.getAllLedgerWithController);
// ==================== GET ALL LEDGERS WITH CHILDREN & PAGINATION ====================
router.get("/all-ledgers", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, ledger_controller_1.LedgerController.getAllLedgerWithChildrenPaginationController);
// ==================== GET LEDGER WITH AMOUNT ====================
router.get("/all-amount", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, ledger_controller_1.LedgerController.getLedgerWithAmountController);
// ==================== CREATE LEDGER ====================
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, ActiveSeasonGuard_1.default, ledger_controller_1.LedgerController.createLedgerController);
// ==================== GET LEDGER DETAILS ====================
router.get("/details/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, ledger_controller_1.LedgerController.getLedgerDetailsController);
// ==================== GET SINGLE LEDGER ====================
router.get("/single/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ledger_controller_1.LedgerController.getSingleLedgerController);
// ==================== UPDATE LEDGER ====================
router.patch("/update/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, ledger_controller_1.LedgerController.updateLedgerController);
// ==================== DELETE LEDGER ====================
router.delete("/delete/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, ledger_controller_1.LedgerController.deleteLedgerController);
exports.default = router;
