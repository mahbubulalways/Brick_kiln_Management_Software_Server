"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_endpoints_1 = require("../../endpoints/api_endpoints");
const challan_controller_1 = require("./challan.controller");
const router = (0, express_1.Router)();
// CREATE INVOICE
router.post(api_endpoints_1.API_ENDPOINTS.INVOICE.CREATE_INVOICE, challan_controller_1.InvoiceController.createInvoiceController);
// GET INVOICE SERIAL
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.INVOICE_SERIAL, challan_controller_1.InvoiceController.getInvoiceSerial);
// GET ALL INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_ALL_INVOICE, challan_controller_1.InvoiceController.getAllInvoiceController);
// GET ITEMS WITH INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_ITEMS_WITH_INVOICE, challan_controller_1.InvoiceController.getItemsWithInvoiceController);
// GET SINGLE INVOICE
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE, challan_controller_1.InvoiceController.getSingleInvoiceController);
// GET SINGLE INVOICE ITEMS
router.get(api_endpoints_1.API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE_ITEMS, challan_controller_1.InvoiceController.getSingleInvoiceItemsController);
// UPDATE INVOICE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.UPDATE_INVOICE, challan_controller_1.InvoiceController.updateInvoiceController);
// UPDATE INVOICE DELIVERY DATE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.UPDATE_INVOICE_DELIVERY_DATE, challan_controller_1.InvoiceController.updateInvoiceDeliveryDateController);
// UPDATE INVOICE ITEM DELIVERY DATE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.UPDATE_INVOICE_ITEM_DELIVERY_DATE, challan_controller_1.InvoiceController.updateInvoiceItemDeliveryDateController);
// DELETE INVOICE
router.patch(api_endpoints_1.API_ENDPOINTS.INVOICE.DELETE_INVOICE, challan_controller_1.InvoiceController.deleteInvoiceController);
exports.default = router;
//# sourceMappingURL=challan.route.js.map