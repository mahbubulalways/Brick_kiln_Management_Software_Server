"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unload_controller_1 = require("./unload.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), unload_controller_1.UnloadController.createUnloadInfoController);
router.get("/all", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), unload_controller_1.UnloadController.getAllUnloadInfoController);
router.get("/report", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), unload_controller_1.UnloadController.getAllUnloadDataNoPaginateController);
router.delete("/delete/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), unload_controller_1.UnloadController.getAllUnloadInfoController);
exports.default = router;
