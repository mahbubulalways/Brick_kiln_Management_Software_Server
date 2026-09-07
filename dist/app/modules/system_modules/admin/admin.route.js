"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.get("/create", 
// AuthGuard(UserRole.SUPER_ADMIN),
admin_controller_1.AdminController.createAdminController);
exports.default = router;
