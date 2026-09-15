import { Router } from "express";
import { TaskManagerController } from "./task.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

// Create Task
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  TaskManagerController.createTaskController,
);

// Get Pending Tasks
router.get(
  "/pending",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  TaskManagerController.getPendingTasksController,
);

// Get Complete Tasks
router.get(
  "/complete",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  TaskManagerController.getCompleteTasksController,
);

// Get Single Task
router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  TaskManagerController.getSingleTaskController,
);

// Update Task
router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  TaskManagerController.updateTaskController,
);

// Delete Task
router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  TaskManagerController.deleteTaskController,
);

export default router;
