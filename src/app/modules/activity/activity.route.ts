import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import AuthGuard from "../../middlewares/AuthGuard";
import { ActivityLogController } from "./activity.controller";

const router = Router();

router.get(
  "/all",
  AuthGuard(
    UserRole.ADMIN,
    UserRole.OWNER,
    UserRole.OPERATOR,
    UserRole.MANAGER,
  ),
  ActivityLogController.getAlActivityLogController,
);

export default router;
