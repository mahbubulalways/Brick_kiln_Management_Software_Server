"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_endpoints_1 = require("../../endpoints/api_endpoints");
const classAndRateRoute_controller_1 = require("./classAndRateRoute.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const classAndRate_validation_1 = require("./classAndRate.validation");
const router = (0, express_1.Router)();
// POST A CLASS AND RATE
router.post(api_endpoints_1.API_ENDPOINTS.CLASS_AND_RATE.CREATE, (0, validateRequest_1.default)(classAndRate_validation_1.CLASS_AND_RATE_VALIDATION), classAndRateRoute_controller_1.ClassAndRateController.createClassAndRateController);
// GET ALL CLASS AND RATE
router.get(api_endpoints_1.API_ENDPOINTS.CLASS_AND_RATE.GET_ALL_ClASS, classAndRateRoute_controller_1.ClassAndRateController.getClassAndRateController);
// GET SINGLE CLASS AND RATE BY ID
router.get(api_endpoints_1.API_ENDPOINTS.CLASS_AND_RATE.GET_CLASS_BY_ID, classAndRateRoute_controller_1.ClassAndRateController.getSingleClassAndRateController);
router.patch(api_endpoints_1.API_ENDPOINTS.CLASS_AND_RATE.UPDATE_CLASS_BY_ID, classAndRateRoute_controller_1.ClassAndRateController.updateClassAndRateController);
exports.default = router;
