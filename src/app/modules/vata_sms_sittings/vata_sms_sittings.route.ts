import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { VataSmsSettingsController } from "./vata_sms_sittings.controller";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  VataSmsSettingsController.createOrUpdateVataSmsController,
);

router.get(
  "/",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  VataSmsSettingsController.getVataSmsSettingController,
);

export default router;
