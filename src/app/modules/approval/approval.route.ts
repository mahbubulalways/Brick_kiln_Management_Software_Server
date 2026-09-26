import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { ApprovalController } from "./approval.controller";

const router = Router();

router.get(
  "/all",
  AuthGuard(UserRole.ADMIN, UserRole.OWNER),
  ApprovalController.getAlApprovalController,
);
router.patch(
  "/update-status/:id",
  AuthGuard(UserRole.ADMIN, UserRole.OWNER),
  ApprovalController.changeApprovalStatusController,
);

export default router;
