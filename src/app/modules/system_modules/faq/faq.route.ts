import { Router } from "express";

import { FaqController } from "./faq.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  FaqController.createFaq,
);

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.SYSTEM_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  FaqController.getFaq,
);

router.patch(
  "/update/:id",
  AuthGuard(UserRole.SYSTEM_ADMIN, UserRole.SUPER_ADMIN),
  FaqController.updateFaq,
);

export default router;
