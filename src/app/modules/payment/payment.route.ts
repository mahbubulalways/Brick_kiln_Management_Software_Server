import { Router } from "express";
import { fileUploader } from "../../../utils/uploader";
import { PaymentController } from "./payment.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";

const router = Router();

// CREATE PAYMENT
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
   ActiveSeasonGuard,
  fileUploader.upload.single("file"),
  PaymentController.createPaymentController,
);
// GET ALL PAYMENT
router.get("/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
   ActiveSeasonGuard,
  PaymentController.getAllPaymentController);

// GET PAYMENT REPORT
router.get("/report/:date",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
   ActiveSeasonGuard,
  PaymentController.paymentReportViaGroupController);

// GET SINGLE PAYMENT
router.get("/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  PaymentController.getSinglePaymentController);

router.patch("/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  fileUploader.upload.single("file"),
  PaymentController.updatePaymentController);

//  DELETE PAYMENT
router.patch(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  PaymentController.deletePaymentController
);

export default router;
