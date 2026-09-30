import { Router } from "express";
import { LedgerController } from "./ledger.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.get(
  "/count",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  LedgerController.getLedgerCountController,
);
// ==================== LEDGER OPTIONS ====================
router.get(
  "/options",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  LedgerController.getLedgerOptionController,
);

// ==================== GET ALL LEDGER ====================
router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  LedgerController.getAllLedgerWithController,
);

// ==================== GET ALL LEDGERS WITH CHILDREN & PAGINATION ====================
router.get(
  "/all-ledgers",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  LedgerController.getAllLedgerWithChildrenPaginationController,
);

// ==================== GET LEDGER WITH AMOUNT ====================
router.get(
  "/all-amount",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  LedgerController.getLedgerWithAmountController,
);

// ==================== CREATE LEDGER ====================
router.post(
  "/create",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  ActiveSeasonGuard,
  LedgerController.createLedgerController,
);

// ==================== GET LEDGER DETAILS ====================
router.get(
  "/details/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  LedgerController.getLedgerDetailsController,
);

// ==================== GET SINGLE LEDGER ====================
router.get(
  "/single/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  LedgerController.getSingleLedgerController,
);

// ==================== UPDATE LEDGER ====================
router.patch(
  "/update/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  LedgerController.updateLedgerController,
);

// ==================== DELETE LEDGER ====================
router.delete(
  "/delete/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  LedgerController.deleteLedgerController,
);
export default router;
