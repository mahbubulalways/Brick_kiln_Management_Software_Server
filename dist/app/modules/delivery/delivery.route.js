"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_endpoints_1 = require("../../endpoints/api_endpoints");
const delivery_controller_1 = require("./delivery.controller");
const router = (0, express_1.Router)();
router.post(api_endpoints_1.API_ENDPOINTS.DELIVERY.CREATE_DELIVERY, delivery_controller_1.DeliveryController.createDeliveryController);
router.get(api_endpoints_1.API_ENDPOINTS.DELIVERY.GET_NEXT_DELIVERY_NO, delivery_controller_1.DeliveryController.getNextDeliveryNoController);
router.get(api_endpoints_1.API_ENDPOINTS.DELIVERY.TODAY_HAVE_TO_DELIVERY, delivery_controller_1.DeliveryController.getDeliveryThatGoTodayController);
router.get(api_endpoints_1.API_ENDPOINTS.DELIVERY.ALL_DELIVERY_LIST, delivery_controller_1.DeliveryController.getAllDeliveryListController);
router.get(api_endpoints_1.API_ENDPOINTS.DELIVERY.TODAYS_DELIVERY, delivery_controller_1.DeliveryController.getTodaysDeliveryThatDoneController);
router.get(api_endpoints_1.API_ENDPOINTS.DELIVERY.GET_SINGLE_DELIVERY, delivery_controller_1.DeliveryController.getSingleDeliveryController);
exports.default = router;
//# sourceMappingURL=delivery.route.js.map