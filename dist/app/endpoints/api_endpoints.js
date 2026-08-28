"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_ENDPOINTS = void 0;
exports.API_ENDPOINTS = {
    CLASS_AND_RATE: {
        CREATE: "/create",
        GET_ALL_ClASS: "/class-and-rate",
        GET_CLASS_BY_ID: "/class-and-rate/:id",
        UPDATE_CLASS_BY_ID: "/update-class-and-rate/:id",
        DELETE: "/delete/:id",
    },
    INVOICE: {
        SEARCH_CHALLAN: "/search",
        INVOICE_SERIAL: "/serial",
        CREATE_INVOICE: "/create",
        GET_ALL_INVOICE: "/all-invoices",
        GET_ADVANCE_INVOICE: "/all-advance-invoices",
        GET_ITEMS_WITH_INVOICE: "/items",
        GET_SINGLE_INVOICE: "/single-invoice/:id",
        GET_SINGLE_INVOICE_ITEMS: "/single-invoice-items/:id",
        UPDATE_INVOICE: "/update-invoice/:id",
        UPDATE_INVOICE_DELIVERY_DATE: "/update-invoice-delivery-date/:id",
        UPDATE_INVOICE_ITEM_DELIVERY_DATE: "/update-item-delivery-date/:id",
        DELETE_INVOICE: "/delete-invoice/:id",
    },
    DELIVERY: {
        GET_NEXT_DELIVERY_NO: "/next-delivery-no",
        TODAYS_DELIVERY: "/todays-delivery",
        TODAY_HAVE_TO_DELIVERY: "/today-have-delivery",
        ALL_DELIVERY_LIST: "/delivery-list",
        CREATE_DELIVERY: "/create-delivery",
        GET_SINGLE_DELIVERY: "/single-delivery/:id",
    },
    DUE_COLLECTION: {
        TODAY_PAID: "/today-paid",
        ALL_DUE: "/all-due",
        GET_SINGLE: "/get-single/:id",
        SEARCH_CUSTOMER: "/search-customer",
        GET_SINGLE_DATE: "/get-single-date/:id",
        UPDATE_DUE_COLLECTION: "/update/:id",
        UPDATE_DUE_COLLECTION_DATE: "/update-date/:id",
        TODAYS_HAVE_DUE: "/today-have-due",
        GET_CUSTOMER_DUE: "/customer-due/:customerId",
        COLLECTION: "/collection",
    },
};
