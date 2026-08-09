"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploader_1 = require("../../../utils/uploader");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
// CREATE PAYMENT
router.post("/create", uploader_1.fileUploader.upload.single("file"), payment_controller_1.PaymentController.createPaymentController);
// GET ALL PAYMENT
router.get("/all", payment_controller_1.PaymentController.getAllPaymentController);
// GET PAYMENT REPORT
router.get("/report/:date", payment_controller_1.PaymentController.paymentReportViaGroupController);
// GET SINGLE PAYMENT
router.get("/single/:id", payment_controller_1.PaymentController.getSinglePaymentController);
router.patch("/update/:id", uploader_1.fileUploader.upload.single("file"), payment_controller_1.PaymentController.updatePaymentController);
//  DELETE PAYMENT
router.patch("/delete/:id", payment_controller_1.PaymentController.deletePaymentController);
exports.default = router;
