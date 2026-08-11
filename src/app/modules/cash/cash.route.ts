import { Router } from "express";
import { CashController } from "./cash.controller";

const router = Router();

// CREATE CASH
router.post(
  "/create",
  CashController.createCash
);

// GET ALL CASH
router.get(
  "/all",
  CashController.getAllCash
);

// GET SINGLE CASH
router.get(
  "/single/:id",
  CashController.getSingleCash
);

// UPDATE CASH
router.patch(
  "/update/:id",
  CashController.updateCash
);

// DELETE CASH
router.delete(
  "/delete/:id",
  CashController.deleteCash
);

export default router;