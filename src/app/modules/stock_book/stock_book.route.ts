import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";
import { StockBookController } from "./stock_book.controller";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

// CREATE NEW STOCK
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  ActiveSeasonGuard,
  StockBookController.createStockBookController,
);

// GET ALL
router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  StockBookController.getAllStockController,
);
// GET ALL
router.get(
  "/main",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  StockBookController.getMainStockController,
);

// DELETE
router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  StockBookController.deleteStockBookController,
);

export default router;
