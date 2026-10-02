import express from "express";

import { VataBackupController } from "./backup.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/create",
  AuthGuard(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
    UserRole.OWNER,
  ),
  VataBackupController.createVataBackupController,
);

router.get(
  "/",
  AuthGuard(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
    UserRole.OWNER,
  ),
  VataBackupController.getVataBackupController,
);

export default router;
