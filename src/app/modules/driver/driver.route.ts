import { Router } from "express";

import { DriverController } from "./driver.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
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
  DriverController.createDriverController,
);

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DriverController.getAllDriversController,
);

router.get(
  "/options",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DriverController.driverOptionsForDeliverController,
);

router.get(
  "/single/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DriverController.getSingleDriverController,
);

router.patch(
  "/update/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  DriverController.updateDriverController,
);

router.delete(
  "/delete/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  DriverController.deleteDriverController,
);

export default router;
