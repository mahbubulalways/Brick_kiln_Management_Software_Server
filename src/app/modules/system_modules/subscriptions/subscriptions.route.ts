import { Router } from "express";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";
import { SubscriptionController } from "./subscription.controller";

const router = Router()

// CREATE NEW SUBSCRIPTION PLAN
router.post(
    "/create",
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    SubscriptionController.createSubscriptionPlanController
)

// GET ALL SUBSCRIPTION PLAN
router.get(
    "/all",
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    SubscriptionController.getAllPaymentController
)

// GET ALL SUBSCRIPTION PLAN OPTIONS
router.get(
    "/options",
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    SubscriptionController.getAllSubscriptionPlanOptionsController
)

// GET ALL SUBSCRIPTION PLAN OPTIONS
router.get(
    "/single/:id",
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    SubscriptionController.getSingleSubscriptionController
)

// GET ALL SUBSCRIPTION PLAN OPTIONS
router.get(
    "/vata-subscription/:id",
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    SubscriptionController.getSingleVataSubscriptionController
)

// UPDATE SINGLE SUBSCRIPTION PLAN
router.patch(
  "/update/:id",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  SubscriptionController.updateSubscriptionController
);
export default router