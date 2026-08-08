import { Router } from "express";
import { LedgerController } from "./ledger.controller";

const router = Router();

router.get("/count", LedgerController.getLedgerCountController);
router.get("/options", LedgerController.getLedgerOptionController);
router.get("/all", LedgerController.getAllLedgerWithController);
router.post("/create", LedgerController.createLedgerController);
export default router;
