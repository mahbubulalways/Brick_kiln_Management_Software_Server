import express from "express";

import { HelpLineController } from "./helpline.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/create",
  AuthGuard(UserRole.SYSTEM_ADMIN, UserRole.SUPER_ADMIN),
  HelpLineController.createOrUpdateHelplineController,
);

router.get(
  "/",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.SYSTEM_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  HelpLineController.getHelplineController,
);

export default router;
