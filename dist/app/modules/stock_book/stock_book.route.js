"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const ActiveSeasonGuard_1 = __importDefault(require("../../middlewares/ActiveSeasonGuard"));
const stock_book_controller_1 = require("./stock_book.controller");
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
// CREATE NEW STOCK
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, stock_book_controller_1.StockBookController.createStockBookController);
// GET ALL
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, stock_book_controller_1.StockBookController.getAllStockController);
// GET ALL
router.get("/main", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, stock_book_controller_1.StockBookController.getMainStockController);
// DELETE
router.delete("/delete/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), stock_book_controller_1.StockBookController.deleteStockBookController);
exports.default = router;
