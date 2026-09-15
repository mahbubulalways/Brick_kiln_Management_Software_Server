import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { SubscriptionPaymentController } from "./subscription_payment.controller";

const router = Router();

// CREATE NEW SUBSCRIPTION PAYMENT
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionPaymentController.createNewSubscriptionPaymentController,
);

// GET ALL PENDING SUBSCRIPTION PAYMENT
// SYSTEM ADMIN
router.get(
  "/pending",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SubscriptionPaymentController.getAllSubscriptionPaymentController,
);

// GET ALL PAID SUBSCRIPTION PAYMENT
// SYSTEM ADMIN
router.get(
  "/paid",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SubscriptionPaymentController.getAllPaidSubscriptionController,
);

// GET OTHER SUBSCRIPTION PAYMENT
// SYSTEM ADMIN
router.get(
  "/other",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SubscriptionPaymentController.getOtherSubscriptionController,
);

// GET VATA SUBSCRIPTION PAYMENT HISTORY
router.get(
  "/history",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionPaymentController.getVataSubscriptionPaymentHistoryController,
);

// UPDATE SUBSCRIPTION PAYMENT STATUS
// SYSTEM ADMIN
router.patch(
  "/update-status/:id",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SubscriptionPaymentController.updateSubscriptionPaymentControllerStatus,
);

export default router;
