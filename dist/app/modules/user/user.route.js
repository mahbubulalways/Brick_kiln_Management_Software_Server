"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/create", user_controller_1.UserController.createUserController);
router.get("/all", user_controller_1.UserController.getAllUsersController);
router.get("/options", user_controller_1.UserController.getUserOptionController);
// GET LOGIN LOOUT
router.get("/history", user_controller_1.UserController.getUserHistoryController);
router.get("/single/:id", user_controller_1.UserController.getSingleUserController);
router.patch("/update/:id", user_controller_1.UserController.updateUserController);
router.delete("/delete/:id", user_controller_1.UserController.deleteUserController);
exports.default = router;
