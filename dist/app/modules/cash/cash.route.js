"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cash_controller_1 = require("./cash.controller");
const router = (0, express_1.Router)();
// CREATE CASH
router.post("/create", cash_controller_1.CashController.createCash);
// GET ALL CASH
router.get("/all", cash_controller_1.CashController.getAllCash);
// GET SINGLE CASH
router.get("/single/:id", cash_controller_1.CashController.getSingleCash);
// UPDATE CASH
router.patch("/update/:id", cash_controller_1.CashController.updateCash);
// DELETE CASH
router.delete("/delete/:id", cash_controller_1.CashController.deleteCash);
exports.default = router;
