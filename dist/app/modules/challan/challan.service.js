"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
const createInvoiceService = async (createdBy, customer, invoiceItems, invoice) => {
    const isSerialExist = await prisma_1.prisma.challan.findFirst({
        where: {
            serial: invoice.serial,
        },
    });
    if (isSerialExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই সিরিয়াল নম্বর ইতিমধ্যেই বিদ্যমান।");
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // CHECK CUSTOMER EXIST OR NOT
        let existingCustomer = await tx.customer.findFirst({
            where: {
                phoneNumber: customer.phoneNumber,
            },
        });
        //   IF CUSTOMER IS NOT EXIST THEN CREATE NEW
        customer.totalPurchased = invoice.totalPrice;
        customer.totalPaid = Number(invoice?.cash) || 0;
        customer.nextPaymentDate = invoice.duePaymentDate;
        if (!existingCustomer) {
            existingCustomer = await tx.customer.create({
                data: customer,
            });
        }
        else {
            // UPDATE CUSTOMER
            const updateData = {
                totalPurchased: { increment: invoice.totalPrice },
                totalPaid: { increment: Number(invoice.cash) || 0 },
            };
            // Only add nextPaymentDate if it exists
            if (invoice.duePaymentDate) {
                updateData.nextPaymentDate = invoice.duePaymentDate;
            }
            await tx.customer.update({
                where: { id: existingCustomer.id },
                data: updateData,
            });
        }
        //  CREATE INVOICE
        invoice.customerId = existingCustomer.id;
        invoice.createdBy = createdBy;
        const newInvoice = await tx.challan.create({
            data: invoice,
        });
        //  FORMAT INVOKE ITEMS AND ADD INVOICE ID
        const invokeInvoiceId = invoiceItems.map((it) => {
            return {
                class: it.class,
                rate: Number(it.rate),
                quantity: Number(it.quantity),
                price: it.price,
                challanId: newInvoice.id,
                deliveryDate: invoice.deliveryDate,
            };
        });
        // CREATE ITEMS OF CHALLAN
        await tx.challanItem.createMany({
            data: invokeInvoiceId,
        });
        return newInvoice;
    });
    return result;
};
// GET AL INVOICE WITH CUSTOMER NAME AND ADDRESS
const getAllInvoiceService = async () => {
    const result = await prisma_1.prisma.challan.findMany({
        where: { isDeleted: false },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: true,
            items: true,
        },
    });
    return result;
};
//  GET SINGLE INVOICE
const getSingleInvoiceService = async (id) => {
    const result = await prisma_1.prisma.challan.findFirst({
        where: { id: id, isDeleted: false },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: true,
            items: true,
        },
    });
    return result;
};
//  GET SINGLE INVOICE ITEMS
const getSingleInvoiceItemsService = async (id, query) => {
    const splitIds = query.split(",");
    const parsedNumber = splitIds.map((id) => Number(id));
    const result = await prisma_1.prisma.challanItem.findMany({
        where: {
            challanId: id,
            id: { in: parsedNumber },
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    // const result = await prisma.challan.findFirst({
    //   where: { id: id },
    //   select: {
    //     id: true,
    //     deliveryDate: true,
    //     items: true,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });
    return result;
};
// UPDATE INVOICE
const updateInvoiceController = async (invoiceId, invoice, items) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // update invoice
        const updateInvoice = await tx.challan.update({
            data: invoice,
            where: {
                id: invoiceId,
            },
        });
        //  SEPARATE NEW AND OLD ITEMS
        const existItems = items.filter((item) => item.id);
        const newItems = items.filter((item) => !item.id);
        // DELETE ITEMS
        // IDS
        const Ids = existItems.map((item) => item.id);
        await tx.challanItem.deleteMany({
            where: {
                challanId: invoiceId,
                id: { notIn: Ids },
            },
        });
        //  update items
        await Promise.all(existItems?.map((item) => tx.challanItem.update({
            where: { id: item.id },
            data: {
                quantity: Number(item.quantity),
                rate: Number(item.rate),
                class: item.class,
                price: Number(item.price),
                deliveryDate: invoice.deliveryDate,
            },
        })));
        // CREATE NEW INVOICE AFTER UPDATE IF THERE ANY NEW ITEM ADDED
        if (newItems?.length) {
            const invokeInvoiceId = newItems.map((it) => {
                return {
                    class: it.class,
                    rate: Number(it.rate),
                    quantity: Number(it.quantity),
                    price: Number(it.price),
                    challanId: invoiceId,
                    deliveryDate: invoice.deliveryDate,
                };
            });
            await tx.challanItem.createMany({
                data: invokeInvoiceId,
            });
        }
        return updateInvoice;
    });
    return result;
};
// DELETE INVOICE
const deleteInvoiceService = async (invoiceId) => {
    const result = await prisma_1.prisma.challan.update({
        data: {
            isDeleted: true,
        },
        where: {
            id: invoiceId,
        },
    });
    const deleteItem = await prisma_1.prisma.challanItem.updateMany({
        data: {
            isDeleted: true,
        },
        where: {
            challanId: invoiceId,
        },
    });
    return result;
};
//*
// GET ITEMS WITH INVOICE
const getItemsWithInvoiceService = async (startDate, endDate) => {
    const whereCondition = {
        isDeleted: false,
    };
    // Only startDate provided → filter only that date
    if (startDate && !endDate) {
        const parsedDate = new Date(startDate);
        // Create start and end of day boundaries
        const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));
        whereCondition.createdAt = {
            gte: startOfDay,
            lte: endOfDay,
        };
    }
    // Both start and end dates provided → filter range
    if (startDate && endDate) {
        // Date Range filter
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        whereCondition.createdAt = {
            gte: start,
            lte: end,
        };
    }
    const result = await prisma_1.prisma.challanItem.findMany({
        where: whereCondition,
        include: {
            challan: {
                select: {
                    id: true,
                    carRent: true,
                    due: true,
                    serial: true,
                    productPrice: true,
                    totalPrice: true,
                    discount: true,
                    cash: true,
                    isDeleted: true,
                },
            },
        },
    });
    return result;
};
// UPDATE INVOICE DELIVERY
const updateInvoiceDeliveryDateService = async (id, updateDate) => {
    const result = await prisma_1.prisma.challan.update({
        data: {
            deliveryDate: updateDate,
            items: {
                updateMany: {
                    data: {
                        deliveryDate: updateDate,
                    },
                    where: { challanId: id },
                },
            },
        },
        where: {
            id,
        },
    });
    return result;
};
// UPDATE PARTICULAR ITEMS DELIVERY DATE
const updateItemsDateService = async (id, updatedDate) => {
    const result = await prisma_1.prisma.challanItem.update({
        data: {
            deliveryDate: updatedDate,
        },
        where: {
            id,
        },
    });
    return result;
};
exports.InvoiceService = {
    createInvoiceService,
    getAllInvoiceService,
    getSingleInvoiceService,
    updateInvoiceController,
    deleteInvoiceService,
    getItemsWithInvoiceService,
    getSingleInvoiceItemsService,
    updateItemsDateService,
    updateInvoiceDeliveryDateService,
};
