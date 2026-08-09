import { Router } from "express";
import { fileUploader } from "../../../utils/uploader";
import { PaymentController } from "./payment.controller";

const router = Router();

// CREATE PAYMENT
router.post(
  "/create",
  fileUploader.upload.single("file"),
  PaymentController.createPaymentController,
);
// GET ALL PAYMENT
router.get("/all", PaymentController.getAllPaymentController);

// GET PAYMENT REPORT
router.get("/report/:date", PaymentController.paymentReportViaGroupController);

// GET SINGLE PAYMENT
router.get("/single/:id",
  PaymentController.getSinglePaymentController);

router.patch("/update/:id",
  fileUploader.upload.single("file"),
  PaymentController.updatePaymentController);
  
//  DELETE PAYMENT
router.patch(
  "/delete/:id",
  PaymentController.deletePaymentController
);

export default router;
