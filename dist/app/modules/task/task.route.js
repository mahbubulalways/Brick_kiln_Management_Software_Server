"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const SubscriptionGuard_1 = __importDefault(require("../../middlewares/SubscriptionGuard"));
const router = (0, express_1.Router)();
// Create Task
router.post("/create", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, task_controller_1.TaskManagerController.createTaskController);
// Get Pending Tasks
router.get("/pending", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), task_controller_1.TaskManagerController.getPendingTasksController);
// Get Complete Tasks
router.get("/complete", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), task_controller_1.TaskManagerController.getCompleteTasksController);
// Get Single Task
router.get("/single/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), task_controller_1.TaskManagerController.getSingleTaskController);
// Update Task
router.patch("/update/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, task_controller_1.TaskManagerController.updateTaskController);
// Delete Task
router.delete("/delete/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, task_controller_1.TaskManagerController.deleteTaskController);
exports.default = router;
