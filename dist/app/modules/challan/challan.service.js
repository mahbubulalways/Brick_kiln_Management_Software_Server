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
// import { getUserAndPermissionForSms } from "../send_sms/send_sms.utils";
const formatDate_1 = require("../../../utils/formatDate");
const send_sms_utils_1 = require("../send_sms/send_sms.utils");
// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
// const createInvoiceService = async (
//   user: TAuthUser,
//   seasonId: string,
//   customer: Customer,
//   invoiceItems: ChallanItem[],
//   invoice: Challan,
// ) => {
//   const isSerialExist = await prisma.challan.findFirst({
//     where: {
//       vataId: user.vataId,
//       serial: invoice.serial,
//     },
//   });
//   if (isSerialExist) {
//     throw new AppError(StatusCodes.CONFLICT, "চালান নম্বর পরিবর্তন করুন");
//   }
//   const result = await prisma.$transaction(
//     async (tx: Prisma.TransactionClient) => {
//       // CHECK CUSTOMER EXIST OR NOT
//       let existingCustomer = await tx.customer.findFirst({
//         where: {
//           vataId: user.vataId,
//           phoneNumber: customer.phoneNumber,
//         },
//       });
//       // IF CUSTOMER IS NOT EXIST THEN CREATE NEW
//       if (!existingCustomer) {
//         const countCustomer =
//           (await tx.customer.count({
//             where: {
//               vataId: user.vataId,
//             },
//           })) + 1;
//         existingCustomer = await tx.customer.create({
//           data: {
//             ...customer,
//             customerCode: generateCode(countCustomer),
//             vataId: user.vataId,
//             nextPaymentDate: invoice.duePaymentDate,
//           },
//         });
//       } else {
//         // IF CUSTOMER ALREADY EXISTS THEN UPDATE NEXT PAYMENT DATE
//         existingCustomer = await tx.customer.update({
//           where: {
//             id: existingCustomer.id,
//           },
//           data: {
//             nextPaymentDate: invoice.duePaymentDate,
//           },
//         });
//       }
//       //  CREATE INVOICE
//       invoice.customerId = existingCustomer.id;
//       invoice.createdById = user.userId;
//       const newInvoice = await tx.challan.create({
//         data: {
//           ...invoice,
//           vataId: user.vataId,
//           seasonId,
//         },
//       });
//       // CREATE CUSTOMER DUE INFO
//       await tx.customerDue.create({
//         data: {
//           dueAmount: Number(invoice.due ?? 0),
//           paidAmount: Number(invoice.cash ?? 0),
//           totalAmount: invoice.totalPrice,
//           challanId: newInvoice.id,
//           customerId: newInvoice.customerId,
//           seasonId: seasonId,
//         },
//       });
//       //  FORMAT INVOKE ITEMS AND ADD INVOICE ID
//       const invokeInvoiceId = invoiceItems.map((it: ChallanItem) => {
//         return {
//           class: it.class,
//           rate: Number(it.rate),
//           quantity: Number(it.quantity),
//           price: Number(it.price),
//           challanId: newInvoice.id,
//           deliveryDate: invoice.deliveryDate,
//         };
//       });
//       // CREATE ITEMS OF CHALLAN
//       await tx.challanItem.createMany({
//         data: invokeInvoiceId,
//       });
//       const deliveryDate = formatDate(invoice.deliveryDate);
//       const clientMessage = `চালান নং: ${newInvoice.serial}, ${invoiceItems
//         .map((item) => `${item.class}: ${Number(item.quantity)} টি`)
//         .join(", ")}, ডেলিভারি: ${deliveryDate}`;
//       const ownerMessage = `নতুন চালান: ${newInvoice.serial}, কাস্টমার: ${existingCustomer.name}, ${invoiceItems
//         .map((item) => `${item.class}: ${Number(item.quantity)} টি`)
//         .join(", ")}, ডেলিভারি: ${deliveryDate}`;
//       // await getUserAndPermissionForSms({
//       //   tx,
//       //   clientPhoneNumber: existingCustomer.phoneNumber,
//       //   from: "NEW_INVOICE",
//       //   clientMessage,
//       //   user,
//       //   sendToOwner: true,
//       //   ownerMessage,
//       // });
//       return newInvoice;
//     },
//   );
//   return result;
// };
const createInvoiceService = async (user, seasonId, customer, invoiceItems, invoice) => {
    // CHALLAN LIMIT
    // const plan = await prisma.vata.findFirst({
    //   where: {
    //     id: user.vataId,
    //   },
    //   select: {
    //     nameBangla: true,
    //     subscriptionPlan: {
    //       select: {
    //         name: true,
    //         maxInvoices: true,
    //       },
    //     },
    //   },
    // });
    // if (!plan?.subscriptionPlan) {
    //   throw new AppError(
    //     StatusCodes.BAD_REQUEST,
    //     "আপনার সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।",
    //   );
    // }
    // const now = new Date();
    // const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    // const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    // const monthlyInvoiceCount = await prisma.challan.count({
    //   where: {
    //     vataId: user.vataId,
    //     createdAt: {
    //       gte: monthStart,
    //       lt: monthEnd,
    //     },
    //   },
    // });
    // const maxInvoices = Number(plan.subscriptionPlan.maxInvoices ?? 0);
    // if (maxInvoices > 0 && monthlyInvoiceCount >= maxInvoices) {
    //   throw new AppError(
    //     StatusCodes.BAD_REQUEST,
    //     "আপনার এই মাসের চালান তৈরির লিমিট শেষ হয়ে গেছে।",
    //   );
    // }
    // LIMIT END
    const isSerialExist = await prisma_1.prisma.challan.findFirst({
        where: {
            vataId: user.vataId,
            serial: invoice.serial,
        },
    });
    if (isSerialExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "চালান নম্বর পরিবর্তন করুন");
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        let existingCustomer = await tx.customer.findFirst({
            where: {
                vataId: user.vataId,
                phoneNumber: customer.phoneNumber,
            },
        });
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
                    vataId: user.vataId,
                    nextPaymentDate: invoice.duePaymentDate,
                },
            });
        }
        else {
            existingCustomer = await tx.customer.update({
                where: {
                    id: existingCustomer.id,
                },
                data: {
                    nextPaymentDate: invoice.duePaymentDate,
                },
            });
        }
        invoice.customerId = existingCustomer.id;
        invoice.createdById = user.userId;
        const newInvoice = await tx.challan.create({
            data: {
                ...invoice,
                vataId: user.vataId,
                seasonId,
            },
        });
        await tx.customerDue.create({
            data: {
                dueAmount: Number(invoice.due ?? 0),
                paidAmount: Number(invoice.cash ?? 0),
                totalAmount: invoice.totalPrice,
                challanId: newInvoice.id,
                customerId: newInvoice.customerId,
                seasonId,
            },
        });
        const invokeInvoiceId = invoiceItems.map((item) => ({
            class: item.class,
            rate: Number(item.rate),
            quantity: Number(item.quantity),
            price: Number(item.price),
            challanId: newInvoice.id,
            deliveryDate: invoice.deliveryDate,
        }));
        await tx.challanItem.createMany({
            data: invokeInvoiceId,
        });
        return {
            newInvoice,
            customer: existingCustomer,
        };
    });
    const deliveryDate = (0, formatDate_1.formatDate)(invoice.deliveryDate);
    const itemsMessage = invoiceItems
        .map((item) => `${item.class}: ${Number(item.quantity)} টি`)
        .join(", ");
    const message = `চালান নং: ${result.newInvoice.serial}, ${itemsMessage}, ডেলিভারি: ${deliveryDate}`;
    await (0, send_sms_utils_1.getUserAndPermissionForSms)({
        clientPhoneNumber: result.customer.phoneNumber,
        from: "NEW_INVOICE",
        user,
        sendToOwner: true,
        message,
    });
    return result.newInvoice;
};
// SEARCH CHALLANS FOR DELIVERY
const searchChallanForDeliveryService = async (user, query) => {
    const searchTerm = query.search?.trim();
    if (!searchTerm) {
        return {
            success: true,
            message: "চালান সার্চ সফল হয়েছে",
            data: [],
        };
    }
    const searchConditions = [
        {
            customer: {
                name: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            },
        },
        {
            customer: {
                address: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            },
        },
        {
            customer: {
                customerCode: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
            },
        },
    ];
    const where = {
        AND: [
            {
                vataId: user.vataId,
                isDeleted: false,
            },
        ],
        OR: searchConditions,
    };
    if (searchTerm && !isNaN(Number(searchTerm))) {
        searchConditions.push({
            serial: Number(searchTerm),
        });
    }
    const result = await prisma_1.prisma.challan.findMany({
        where,
        select: {
            serial: true,
            customer: {
                select: {
                    name: true,
                    address: true,
                    customerCode: true,
                    phoneNumber: true,
                },
            },
            items: {
                select: {
                    id: true,
                    class: true,
                    quantity: true,
                    delivered: true,
                    deliveryDate: true,
                },
            },
            note: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });
    return result;
};
// GET AL INVOICE WITH CUSTOMER NAME AND ADDRESS
const getAllInvoiceService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
        seasonId: seasonId,
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        const isNumber = !isNaN(Number(search));
        if (isNumber) {
            where.serial = Number(search);
        }
        else {
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
    }
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.challanDate = dateRange;
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
                season: true,
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.challan.count({ where }),
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
    console.log(limit);
    const where = {
        vataId: user.vataId,
        isDeleted: false,
        chalanType: "অগ্রিম চালান",
        seasonId,
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
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.challan.count({ where }),
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
                    name: true,
                },
            },
            season: {
                select: {
                    name: true,
                    id: true,
                },
            },
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
        select: { id: true },
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
        where: { serial: Number(serialId), vataId: user.vataId },
        select: { id: true },
    });
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // update invoice
        const updateInvoice = await tx.challan.update({
            data: invoice,
            where: {
                id: invoiceId?.id,
                vataId: user.vataId,
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
            vataId: user.vataId,
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
const getItemsWithInvoiceService = async (user, seasonId, query) => {
    const whereCondition = {
        isDeleted: false,
        challan: {
            vataId: user.vataId,
            seasonId,
        },
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            whereCondition.challan = {
                challanDate: dateRange,
            };
        }
    }
    if (query.search === "ADVANCED") {
        whereCondition.challan = {
            chalanType: "অগ্রিম চালান",
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
            id,
            challan: {
                vataId: user.vataId,
            },
        },
    });
    return result;
};
// UPDATE INVOICE DELIVERY
const updateInvoiceDeliveryDateService = async (user, id, updatedDate) => {
    const challanId = await prisma_1.prisma.challan.findFirst({
        where: {
            serial: Number(id),
            vataId: user.vataId,
        },
        select: { id: true },
    });
    const result = await prisma_1.prisma.challan.update({
        data: {
            deliveryDate: updatedDate,
            items: {
                updateMany: {
                    data: {
                        deliveryDate: updatedDate,
                    },
                    where: { challanId: challanId?.id },
                },
            },
        },
        where: {
            id: challanId?.id,
            vataId: user.vataId,
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
    getAllAdvanceInvoiceService,
    searchChallanForDeliveryService,
};
