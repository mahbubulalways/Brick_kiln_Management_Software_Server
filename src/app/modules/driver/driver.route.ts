import { Router } from "express";

import { DriverController } from "./driver.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DriverController.createDriverController
);

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DriverController.getAllDriversController
);

router.get(
  "/options",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DriverController.driverOptionsForDeliverController
);

router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DriverController.getSingleDriverController
);

router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DriverController.updateDriverController
);

router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DriverController.deleteDriverController
);

export default router;