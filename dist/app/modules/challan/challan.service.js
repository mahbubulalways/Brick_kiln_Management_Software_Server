"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const generateCode_1 = require("../../../utils/generateCode");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const ApplicationError_1 = require("../../errors/ApplicationError");
const http_status_codes_1 = require("http-status-codes");
// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
const createInvoiceService = async (user, seasonId, customer, invoiceItems, invoice) => {
    const isSerialExist = await prisma_1.prisma.challan.findFirst({
        where: {
            vataId: user.vataId,
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
                vataId: user.vataId,
                phoneNumber: customer.phoneNumber,
            },
        });
        //   IF CUSTOMER IS NOT EXIST THEN CREATE NEW
        customer.totalPurchased = invoice.totalPrice;
        customer.totalPaid = Number(invoice?.cash) || 0;
        customer.nextPaymentDate = invoice.duePaymentDate;
        customer.seasonId = seasonId;
        if (!existingCustomer) {
            const countCustomer = (await tx.customer.count({
                where: {
                    vataId: user.vataId,
                },
            })) + 1;
            existingCustomer = await tx.customer.create({
                data: {
                    ...customer,
                    customerCode: (0, generateCode_1.generateCode)(countCustomer),
                    vataId: user.vataId
                },
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
                where: { id: existingCustomer.id, vataId: user.vataId },
                data: updateData,
            });
        }
        //  CREATE INVOICE
        invoice.customerId = existingCustomer.id;
        invoice.createdById = user.userId;
        const newInvoice = await tx.challan.create({
            data: {
                ...invoice,
                vataId: user.vataId,
                seasonId
            },
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
const getAllInvoiceService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { vataId: user.vataId, isDeleted: false, seasonId: seasonId };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.customer = {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    address: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        };
    }
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.createdAt = dateRange;
        }
    }
    const [result, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.challan.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: true,
                items: true,
                season: true
            }, skip, take: limit
        }),
        prisma_1.prisma.challan.count({ where })
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
// GET ADVANCE INVOICE
const getAllAdvanceInvoiceService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
        chalanType: "অগ্রিম চালান",
        seasonId
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.customer = {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    address: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        };
    }
    const [result, total] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.challan.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                customer: true,
                items: true,
            }, skip, take: limit
        }),
        prisma_1.prisma.challan.count({ where })
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
//  GET SINGLE INVOICE
const getSingleInvoiceService = async (user, id) => {
    const result = await prisma_1.prisma.challan.findFirst({
        where: { serial: Number(id), isDeleted: false, vataId: user.vataId },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: true,
            items: true,
            createdBy: {
                select: {
                    name: true
                }
            }
        },
    });
    return result;
};
//  GET SINGLE INVOICE ITEMS
const getSingleInvoiceItemsService = async (user, id, query) => {
    const splitIds = query.split(",");
    const parsedNumber = splitIds.map((id) => id);
    const challanId = await prisma_1.prisma.challan.findFirst({
        where: { serial: Number(id), vataId: user.vataId },
        select: { id: true }
    });
    const result = await prisma_1.prisma.challanItem.findMany({
        where: {
            challanId: challanId?.id,
            id: { in: parsedNumber },
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
// UPDATE INVOICE
const updateInvoiceService = async (user, serialId, invoice, items) => {
    const invoiceId = await prisma_1.prisma.challan.findFirst({
        where: { serial: Number(serialId), vataId: user.vataId }, select: { id: true }
    });
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // update invoice
        const updateInvoice = await tx.challan.update({
            data: invoice,
            where: {
                id: invoiceId?.id,
                vataId: user.vataId
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
                challanId: invoiceId?.id,
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
                    challanId: invoiceId?.id,
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
const deleteInvoiceService = async (user, invoiceId) => {
    const result = await prisma_1.prisma.challan.update({
        data: {
            isDeleted: true,
        },
        where: {
            id: invoiceId,
            vataId: user.vataId
        },
    });
    await prisma_1.prisma.challanItem.updateMany({
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
const getItemsWithInvoiceService = async (user, seasonId, startDate, endDate) => {
    const whereCondition = {
        isDeleted: false,
        challan: {
            vataId: user.vataId,
            seasonId,
        }
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
// UPDATE PARTICULAR ITEMS DELIVERY DATE
const updateItemsDateService = async (user, id, updateDate) => {
    const result = await prisma_1.prisma.challanItem.update({
        data: {
            deliveryDate: updateDate,
        },
        where: {
            id, challan: {
                vataId: user.vataId
            }
        },
    });
    return result;
};
// UPDATE INVOICE DELIVERY
const updateInvoiceDeliveryDateService = async (user, id, updatedDate) => {
    const challanId = await prisma_1.prisma.challan.findFirst({
        where: {
            serial: Number(id),
            vataId: user.vataId
        },
        select: { id: true }
    });
    const result = await prisma_1.prisma.challan.update({
        data: {
            deliveryDate: updatedDate,
            items: {
                updateMany: {
                    data: {
                        deliveryDate: updatedDate,
                    },
                    where: { challanId: challanId?.id, },
                },
            },
        },
        where: {
            id: challanId?.id, vataId: user.vataId
        },
    });
    return result;
};
exports.InvoiceService = {
    createInvoiceService,
    getAllInvoiceService,
    getSingleInvoiceService,
    updateInvoiceService,
    deleteInvoiceService,
    getItemsWithInvoiceService,
    getSingleInvoiceItemsService,
    updateItemsDateService,
    updateInvoiceDeliveryDateService,
    getAllAdvanceInvoiceService
};
