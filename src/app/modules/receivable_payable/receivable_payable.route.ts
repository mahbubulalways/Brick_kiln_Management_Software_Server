import { Router } from "express";
import { ReceivablePayableController } from "./receivable_payable.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  ReceivablePayableController.createReceivablePayableController,
);

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ReceivablePayableController.getAllReceivablePayableController,
);

router.get(
  "/single/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ReceivablePayableController.getSingleReceivablePayableController,
);

router.get(
  "/amount/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ReceivablePayableController.getCurrentAmountController,
);

router.post(
  "/transaction/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  ReceivablePayableController.createTransactionController,
);

export default router;
