import { Router } from "express";
import { CustomerController } from "./customer.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";

const router = Router();

router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    CustomerController.getAllCustomertController)

router.get("/old",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    CustomerController.getOldCustomerController)

router.get("/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    CustomerController.getSingleCustomertController)

router.get("/info/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    CustomerController.getSingleCustomerInfoController)

router.get("/invoices/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    CustomerController.getCustomertAllChallanController)

router.get("/deliveries/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    CustomerController.getCustomerAllDeliveryController)

router.get("/dues/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    CustomerController.getCustomerAllDuesController)

router.patch("/update/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    CustomerController.updateCustomerInfoController)

export default router;
