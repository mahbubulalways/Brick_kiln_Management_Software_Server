import { Router } from "express";
import { LedgerController } from "./ledger.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
    "/count",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    LedgerController.getLedgerCountController
);

router.get("/options",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    LedgerController.getLedgerOptionController);
router.get("/all", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.getAllLedgerWithController);
router.get("/all-ledgers", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.getAllLedgerWithChildrenPaginationController);
router.get("/all-amount", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.getLedgerWithAmountController);
router.post("/create", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.createLedgerController);
router.get("/details/:id", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.getLedgerDetailsController);
router.get("/single/:id", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.getSingleLedgerController);
router.patch("/update/:id", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.updateLedgerController);
router.delete("/delete/:id", AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER), LedgerController.deleteLedgerController);
export default router;
