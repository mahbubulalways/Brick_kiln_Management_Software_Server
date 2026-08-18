"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("./task.controller");
const router = (0, express_1.Router)();
// Create Task
router.post("/create", task_controller_1.TaskManagerController.createTaskController);
// Get Pending Tasks
router.get("/pending", task_controller_1.TaskManagerController.getPendingTasksController);
// Get Complete Tasks
router.get("/complete", task_controller_1.TaskManagerController.getCompleteTasksController);
// Get Single Task
router.get("/single/:id", task_controller_1.TaskManagerController.getSingleTaskController);
// Update Task
router.patch("/update/:id", task_controller_1.TaskManagerController.updateTaskController);
// Delete Task
router.delete("/delete/:id", task_controller_1.TaskManagerController.deleteTaskController);
exports.default = router;
