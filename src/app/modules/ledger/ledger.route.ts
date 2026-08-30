import { Router } from "express";
import { LedgerController } from "./ledger.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";

const router = Router();

router.get(
    "/count",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    LedgerController.getLedgerCountController
);
// ==================== LEDGER OPTIONS ====================
router.get(
    "/options",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    LedgerController.getLedgerOptionController
);

// ==================== GET ALL LEDGER ====================
router.get(
    "/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    LedgerController.getAllLedgerWithController
);

// ==================== GET ALL LEDGERS WITH CHILDREN & PAGINATION ====================
router.get(
    "/all-ledgers",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    LedgerController.getAllLedgerWithChildrenPaginationController
);

// ==================== GET LEDGER WITH AMOUNT ====================
router.get(
    "/all-amount",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    LedgerController.getLedgerWithAmountController
);

// ==================== CREATE LEDGER ====================
router.post(
    "/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    LedgerController.createLedgerController
);

// ==================== GET LEDGER DETAILS ====================
router.get(
    "/details/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    LedgerController.getLedgerDetailsController
);

// ==================== GET SINGLE LEDGER ====================
router.get(
    "/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    LedgerController.getSingleLedgerController
);

// ==================== UPDATE LEDGER ====================
router.patch(
    "/update/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    LedgerController.updateLedgerController
);

// ==================== DELETE LEDGER ====================
router.delete(
    "/delete/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    LedgerController.deleteLedgerController
);
export default router;
