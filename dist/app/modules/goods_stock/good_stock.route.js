"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const good_stock_controller_1 = require("./good_stock.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const uploader_1 = require("../../../utils/uploader");
const router = (0, express_1.Router)();
// CREATE GOOD
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), uploader_1.fileUploader.upload.single("file"), good_stock_controller_1.GoodStockController.createGoodStockController);
// GET ALL
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getAllGoodStockController);
// GET OPTIONS
router.get("/options", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getGoodStockOptionsController);
// GET DAMAGE
router.get("/demage", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getDemageController);
// GET LOST
router.get("/lost", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getLostController);
// GET SINGLE GOOD
router.get("/single/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getSingleGoodStockController);
// GET SINGLE GOOD
router.get("/single-info/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getSingleGoodStockInfoForUpdateController);
// GET LOSS
router.get("/loss/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.getSingleGoodLossController);
// UPDATE
router.patch("/loss/update/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.updateGoodLossController);
// DELETE GOOD
router.delete("/delete/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), good_stock_controller_1.GoodStockController.deleteGoodStockController);
// UPDATE
router.patch("/update-good/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), uploader_1.fileUploader.upload.single("file"), good_stock_controller_1.GoodStockController.updateGoodStockController);
exports.default = router;
