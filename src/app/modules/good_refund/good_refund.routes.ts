import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { fileUploader } from "../../../utils/uploader";
import { GoodRefundController } from "./good_refund.controller";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  fileUploader.upload.single("file"),
  GoodRefundController.createGoodIssueRefundController,
);

export default router;
