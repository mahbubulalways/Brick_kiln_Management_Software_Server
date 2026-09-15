import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { VataSmsSettingsController } from "./vata_sms_sittings.controller";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  VataSmsSettingsController.createOrUpdateVataSmsController,
);

router.get(
  "/",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataSmsSettingsController.getVataSmsSettingController,
);

export default router;
