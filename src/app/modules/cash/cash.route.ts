import { Router } from "express";
import { CashController } from "./cash.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";

const router = Router();

// CREATE CASH
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  CashController.createCash
);

// GET ALL CASH
router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  CashController.getAllCash
);

// GET CASH REPORT
router.get(
  "/report",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  CashController.getAllCashReport
);

// GET SINGLE CASH
router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  CashController.getSingleCash
);

// UPDATE CASH
router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  CashController.updateCash
);

// DELETE CASH
router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  CashController.deleteCash
);

export default router;