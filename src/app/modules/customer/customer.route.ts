import { Router } from "express";
import { CustomerController } from "./customer.controller";

const router = Router();

router.get("/all", CustomerController.getAllCustomertController)
router.get("/single/:id", CustomerController.getSingleCustomertController)
router.get("/info/:id", CustomerController.getSingleCustomerInfoController)
router.get("/invoices/:id", CustomerController.getCustomertAllChallanController)
router.get("/deliveries/:id", CustomerController.getCustomerAllDeliveryController)
router.get("/dues/:id", CustomerController.getCustomerAllDuesController)
router.patch("/update/:id", CustomerController.updateCustomerInfoController)

export default router;
