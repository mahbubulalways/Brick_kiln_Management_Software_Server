import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { InvoiceController } from "./challan.controller";
import { UserRole } from "../../../generated/prisma/enums";
import AuthGuard from "../../middlewares/AuthGuard";

const router = Router();
// CREATE INVOICE
router.post(
  API_ENDPOINTS.INVOICE.CREATE_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.createInvoiceController
);

// GET INVOICE SERIAL
router.get(
  API_ENDPOINTS.INVOICE.INVOICE_SERIAL,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.getInvoiceSerial
);

// GET ALL INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_ALL_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.getAllInvoiceController
);

// GET ALL ADVANCE INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_ADVANCE_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.getAllAdvanceInvoiceController
);


// GET ITEMS WITH INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_ITEMS_WITH_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.getItemsWithInvoiceController
);

// GET SINGLE INVOICE
router.get(
  API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.getSingleInvoiceController
);

// GET SINGLE INVOICE ITEMS
router.get(
  API_ENDPOINTS.INVOICE.GET_SINGLE_INVOICE_ITEMS,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.getSingleInvoiceItemsController
);

// UPDATE INVOICE
router.patch(
  API_ENDPOINTS.INVOICE.UPDATE_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.updateInvoiceController
);

// UPDATE INVOICE DELIVERY DATE
router.patch(
  API_ENDPOINTS.INVOICE.UPDATE_INVOICE_DELIVERY_DATE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.updateInvoiceDeliveryDateController
);

// UPDATE INVOICE ITEM DELIVERY DATE
router.patch(
  API_ENDPOINTS.INVOICE.UPDATE_INVOICE_ITEM_DELIVERY_DATE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.updateInvoiceItemDeliveryDateController
);

// DELETE INVOICE
router.patch(
  API_ENDPOINTS.INVOICE.DELETE_INVOICE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  InvoiceController.deleteInvoiceController
);

export default router;
