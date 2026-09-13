import { Router } from "express";
import { VataCarController } from "./vata_car.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

// CRAETE NEW CAR
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataCarController.createNewVataCarController,
);

// GET CAR
router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataCarController.getAllCarController,
);
// GET CAR
router.get(
  "/history",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataCarController.getCarIncomeHistoryController,
);
// GET CAR
router.get(
  "/single/income/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataCarController.getSingleCarDeliveryIncomController,
);

export default router;
