"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/login", 
// VALIDATE_REQUEST(AUTH_LOGIN_VALIDATION),
auth_controller_1.AuthController.loginUserToSystemController);
exports.default = router;
