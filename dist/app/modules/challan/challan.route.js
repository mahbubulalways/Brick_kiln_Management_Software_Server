"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_endpoints_1 = require("../../endpoints/api_endpoints");
const challan_controller_1 = require("./challan.controller");
const enums_1 = require("../../../generated/prisma/enums");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const ActiveSeasonGuard_1 = __importDefault(require("../../middlewares/ActiveSeasonGuard"));
const SubscriptionGuard_1 = __importDefault(require("../../middlewares/SubscriptionGuard"));
const router = (0, express_1.Router)();
// CREATE INVOICE
router.post(api_endpoints_1.API_ENDPOINTS.INVOICE.CREATE_INVOICE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, ActiveSeasonGuard_1.default, challan_controller_1.InvoiceController.createInvoiceController);
// GET INVOICE SERIAL
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.INVOICE_SERIAL, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), challan_controller_1.InvoiceController.getInvoiceSerial);
// SEARCH
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.SEARCH_CHALLAN, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), challan_controller_1.InvoiceController.searchChallanForDeliveryController);
// GET ALL INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_ALL_INVOICE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, challan_controller_1.InvoiceController.getAllInvoiceController);
// GET ALL ADVANCE INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_ADVANCE_INVOICE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), ActiveSeasonGuard_1.default, challan_controller_1.InvoiceController.getAllAdvanceInvoiceController);
// GET ITEMS WITH INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_ITEMS_WITH_INVOICE, ActiveSeasonGuard_1.default, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), challan_controller_1.InvoiceController.getItemsWithInvoiceController);
// GET SINGLE INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), challan_controller_1.InvoiceController.getSingleInvoiceController);
// GET SINGLE INVOICE ITEMS
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE_ITEMS, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), challan_controller_1.InvoiceController.getSingleInvoiceItemsController);
// UPDATE INVOICE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.UPDATE_INVOICE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, challan_controller_1.InvoiceController.updateInvoiceController);
// UPDATE INVOICE DELIVERY DATE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.UPDATE_INVOICE_DELIVERY_DATE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, challan_controller_1.InvoiceController.updateInvoiceDeliveryDateController);
// UPDATE INVOICE ITEM DELIVERY DATE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.UPDATE_INVOICE_ITEM_DELIVERY_DATE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, challan_controller_1.InvoiceController.updateInvoiceItemDeliveryDateController);
// DELETE INVOICE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.DELETE_INVOICE, (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), SubscriptionGuard_1.default, challan_controller_1.InvoiceController.deleteInvoiceController);
exports.default = router;
