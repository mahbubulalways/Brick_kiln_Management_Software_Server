import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { NotificationController } from "./notification.controller";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.get(
  "/unread",
  AuthGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.OWNER),
  ActiveSeasonGuard,
  NotificationController.getUnreadNotificationsNumber,
);

router.get(
  "/all",
  AuthGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.OWNER),
  ActiveSeasonGuard,
  NotificationController.getAllNotification,
);

router.patch(
  "/update/:id",
  AuthGuard(UserRole.ADMIN, UserRole.MANAGER, UserRole.OWNER),
  SubscriptionGuard,
  NotificationController.updateNotification,
);

export default router;
