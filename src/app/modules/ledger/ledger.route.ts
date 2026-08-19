import { Router } from "express";
import { LedgerController } from "./ledger.controller";

const router = Router();

router.get("/count", LedgerController.getLedgerCountController);
router.get("/options", LedgerController.getLedgerOptionController);
router.get("/all", LedgerController.getAllLedgerWithController);
router.get("/all-ledgers", LedgerController.getAllLedgerWithChildrenPaginationController);
router.get("/all-amount", LedgerController.getLedgerWithAmountController);
router.post("/create", LedgerController.createLedgerController);
router.get("/details/:id", LedgerController.getLedgerDetailsController);
router.get("/single/:id", LedgerController.getSingleLedgerController);
router.patch("/update/:id", LedgerController.updateLedgerController);
router.delete("/delete/:id", LedgerController.deleteLedgerController);
export default router;
