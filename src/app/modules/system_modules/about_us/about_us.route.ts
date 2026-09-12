import { Router } from "express";

import { AboutUsController } from "./about_us.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  AboutUsController.createAboutUsController,
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
  AboutUsController.getAboutUsController,
);

export default router;
