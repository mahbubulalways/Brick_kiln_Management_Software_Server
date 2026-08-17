import { Router } from "express";
import { ReceivablePayableController } from "./receivable_payable.controller";

const router = Router()

router.post("/create", ReceivablePayableController.createReceivablePayableController)
router.get("/all", ReceivablePayableController.getAllReceivablePayableController)

export default router