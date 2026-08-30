"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_endpoints_1 = require("../../endpoints/api_endpoints");
const due_collection_controller_1 = require("./due_collection.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const ActiveSeasonGuard_1 = __importDefault(require("../../middlewares/ActiveSeasonGuard"));
const router = (0, express_1.Router)();
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.TODAYS_HAVE_DUE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, due_collection_controller_1.DueCollectionController.todayPayDueController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.TODAY_PAID, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, due_collection_controller_1.DueCollectionController.getTodaysDuePaidController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.ALL_DUE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, due_collection_controller_1.DueCollectionController.getAllDueListController);
router.post(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.COLLECTION, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, due_collection_controller_1.DueCollectionController.collectionNewDueController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.GET_CUSTOMER_DUE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, due_collection_controller_1.DueCollectionController.getDueOfCustomerController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), due_collection_controller_1.DueCollectionController.getSingleDueCollectionController);
// SEARCH CUSTOMER VIA NAME AND GET DEU
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.SEARCH_CUSTOMER, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, due_collection_controller_1.DueCollectionController.searchCustomerForDeuController);
router.get(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE_DATE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), due_collection_controller_1.DueCollectionController.getSingleDueCollectionDateController);
router.patch(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), due_collection_controller_1.DueCollectionController.updateDueCollectionController);
router.patch(api_endpoints_1.API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION_DATE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), due_collection_controller_1.DueCollectionController.updateDueCollectionDateController);
exports.default = router;
