import { Router } from "express";
import { ReceivablePayableController } from "./receivable_payable.controller";

const router = Router()

router.post("/create", ReceivablePayableController.createReceivablePayableController)
router.get("/all", ReceivablePayableController.getAllReceivablePayableController)
router.get("/single/:id", ReceivablePayableController.getSingleReceivablePayableController)
router.get("/amount/:id", ReceivablePayableController.getCurrentAmountController)
router.post("/transaction/:id", ReceivablePayableController.createTransactionController)

export default router