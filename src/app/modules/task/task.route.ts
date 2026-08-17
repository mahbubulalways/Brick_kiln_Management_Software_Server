import { Router } from "express";
import { TaskManagerController } from "./task.controller";

const router = Router();

// Create Task
router.post(
    "/create",
    TaskManagerController.createTaskController
);

// Get Pending Tasks
router.get(
    "/pending",
    TaskManagerController.getPendingTasksController
);

// Get Complete Tasks
router.get(
    "/complete",
    TaskManagerController.getCompleteTasksController
);

// Get Single Task
router.get(
    "/single/:id",
    TaskManagerController.getSingleTaskController
);

// Update Task
router.patch(
    "/update/:id",
    TaskManagerController.updateTaskController
);

// Delete Task
router.delete(
    "/delete/:id",
    TaskManagerController.deleteTaskController
);

export default router;