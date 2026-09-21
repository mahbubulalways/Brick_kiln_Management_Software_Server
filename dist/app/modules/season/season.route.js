"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const season_controller_1 = require("./season.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
// router.post(
//   "/create",
//   AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
// );
router.get("/", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), season_controller_1.SeasonController.getAllSeasons);
router.get("/active", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), season_controller_1.SeasonController.getActiveSeason);
router.patch("/select/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), season_controller_1.SeasonController.changeActiveSeason);
exports.default = router;
