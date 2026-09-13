import { Router } from "express";

import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";
import { DatabaseBackupController } from "./database.controller";

const router = Router();

router.post(
  "/backup",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  DatabaseBackupController.createBackupController,
);

router.get(
  "/backup",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  DatabaseBackupController.getAllBackupController,
);

// BACKUP PERMISSIPN
router.get(
  "/backup-permission",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  DatabaseBackupController.getDatabaseBackupPermissionController,
);

router.post(
  "/update-backup-permission",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  DatabaseBackupController.databaseBackupPermissionController,
);

router.delete(
  "/backup/:id",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  DatabaseBackupController.deleteBackupController,
);

export default router;
