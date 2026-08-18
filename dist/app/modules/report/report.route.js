"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("./report.controller");
const router = (0, express_1.Router)();
router.get("/area", report_controller_1.ReportController.getAllCustomertController);
router.get("/dashboard", report_controller_1.ReportController.dashboardAllReportController);
exports.default = router;
