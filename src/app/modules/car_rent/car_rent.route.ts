import { Router } from "express";
import { CarRentController } from "./car_rent.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  CarRentController.createCarRentController,
);

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  CarRentController.getALlCarRentController,
);

router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  CarRentController.getSingleCarRentController,
);

router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  CarRentController.updateCarRentController,
);

router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  CarRentController.deleteCarRentController,
);

export default router;
