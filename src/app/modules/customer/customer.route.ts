import { Router } from "express";
import { CustomerController } from "./customer.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get("/all", CustomerController.getAllCustomertController)
router.get("/old",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    CustomerController.getOldCustomerController)

router.get("/single/:id", CustomerController.getSingleCustomertController)
router.get("/info/:id", CustomerController.getSingleCustomerInfoController)
router.get("/invoices/:id", CustomerController.getCustomertAllChallanController)
router.get("/deliveries/:id", CustomerController.getCustomerAllDeliveryController)
router.get("/dues/:id", CustomerController.getCustomerAllDuesController)
router.patch("/update/:id", CustomerController.updateCustomerInfoController)

export default router;
