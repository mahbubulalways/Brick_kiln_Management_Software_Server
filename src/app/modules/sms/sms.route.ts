import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { SmsController } from "./sms.controller";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/purchase",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  SmsController.purchaseManualSmsController,
);

router.get(
  "/vata",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SmsController.getMyVatarSmsReportController,
);

router.get(
  "/purchase-history",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SmsController.getSmspurchaseHistroyController,
);

// ADMIN
// MANUAL SMS REQUST
router.get(
  "/admin/purchase-request",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SmsController.getManualSmspurchaseRequestController,
);

// ALL SMS PAYMENT HISTIRY
router.get(
  "/admin/payment-history",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SmsController.getAllSmspurchaseHistoryController,
);

// UPDATE MANUAL STATUS
router.patch(
  "/admin/update-status/:id",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SmsController.updateSmsPaymentStatusController,
);

export default router;
