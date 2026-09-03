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
    SubscriptionController.ggetAllSubscriptionPlanOptionsController
)

export default router