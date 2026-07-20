"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_endpoints_1 = require("../../endpoints/api_endpoints");
const due_collection_controller_1 = require("./due_collection.controller");
const router = (0, express_1.Router)();
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.TODAYS_HAVE_DUE, due_collection_controller_1.DueCollectionController.todayPayDueController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.TODAY_PAID, due_collection_controller_1.DueCollectionController.getTodaysDuePaidController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.ALL_DUE, due_collection_controller_1.DueCollectionController.getAllDueListController);
router.post(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.COLLECTION, due_collection_controller_1.DueCollectionController.collectionNewDueController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.GET_CUSTOMER_DUE, due_collection_controller_1.DueCollectionController.getDueOfCustomerController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE, due_collection_controller_1.DueCollectionController.getSingleDueCollectionController);
router.patch(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION, due_collection_controller_1.DueCollectionController.updateDueCollectionController);
exports.default = router;
//# sourceMappingURL=due_collection.route.js.map