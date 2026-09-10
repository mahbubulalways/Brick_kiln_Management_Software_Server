import { Router } from "express";

import { downloadDatabaseBackup } from "./database.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = Router();

router.get(
  "/backup",
  // AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  downloadDatabaseBackup,
);

export default router;
