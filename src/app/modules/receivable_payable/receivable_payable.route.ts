import { Router } from "express";
import { ReceivablePayableController } from "./receivable_payable.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReceivablePayableController.createReceivablePayableController)

router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),

    ReceivablePayableController.getAllReceivablePayableController)

router.get("/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReceivablePayableController.getSingleReceivablePayableController)

router.get("/amount/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReceivablePayableController.getCurrentAmountController)

router.post("/transaction/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReceivablePayableController.createTransactionController)

export default router