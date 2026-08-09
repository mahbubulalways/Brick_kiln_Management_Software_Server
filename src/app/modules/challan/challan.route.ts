import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { InvoiceController } from "./challan.controller";

const router = Router();
// CREATE INVOICE
router.post(
  API_ENDPOINTS.INVOICE.CREATE_INVOICE,
  InvoiceController.createInvoiceController
);

// GET INVOICE SERIAL
router.get(
  API_ENDPOINTS.INVOICE.INVOICE_SERIAL,
  InvoiceController.getInvoiceSerial
);

// GET ALL INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_ALL_INVOICE,
  InvoiceController.getAllInvoiceController
);

// GET ALL ADVANCE INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_ADVANCE_INVOICE,
  InvoiceController.getAllAdvanceInvoiceController
);


// GET ITEMS WITH INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_ITEMS_WITH_INVOICE,
  InvoiceController.getItemsWithInvoiceController
);

// GET SINGLE INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE,
  InvoiceController.getSingleInvoiceController
);

// GET SINGLE INVOICE ITEMS
router.get(
  API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE_ITEMS,
  InvoiceController.getSingleInvoiceItemsController
);

// UPDATE INVOICE
router.patch(
  API_ENDPOINTS.INVOICE.UPDATE_INVOICE,
  InvoiceController.updateInvoiceController
);

// UPDATE INVOICE DELIVERY DATE
router.patch(
  API_ENDPOINTS.INVOICE.UPDATE_INVOICE_DELIVERY_DATE,
  InvoiceController.updateInvoiceDeliveryDateController
);

// UPDATE INVOICE ITEM DELIVERY DATE
router.patch(
  API_ENDPOINTS.INVOICE.UPDATE_INVOICE_ITEM_DELIVERY_DATE,
  InvoiceController.updateInvoiceItemDeliveryDateController
);

// DELETE INVOICE
router.patch(
  API_ENDPOINTS.INVOICE.DELETE_INVOICE,
  InvoiceController.deleteInvoiceController
);

export default router;
