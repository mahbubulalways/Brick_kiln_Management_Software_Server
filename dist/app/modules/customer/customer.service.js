"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../errors/ApplicationError");
const prisma_1 = require("../../../helpers/prisma");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const customer_utils_1 = require("./customer.utils");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
// GET SINGLE INFO
const getSingleCustomerService = async (id) => {
    const result = await prisma_1.prisma.customer.findFirst({
        where: { id },
        select: {
            address: true,
            name: true,
            phoneNumber: true,
            id: true
        }
    });
    return result;
};
// UPDATE 
const updateCustomerService = async (id, data) => {
    const exist = await getSingleCustomerService(id);
    if (!exist?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.customer.update({
        where: { id },
        data: data
    });
    return result;
};
const getAllCustomerService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        const isNumber = !isNaN(Number(search));
        where.OR = [
            ...(isNumber
                ? [
                    {
                        id: Number(search),
                    },
                ]
                : []),
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
            {
                phoneNumber: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    const [customers, total] = await Promise.all([
        prisma_1.prisma.customer.findMany({
            where,
            include: {
                challans: {
                    where: {
                        isDeleted: false,
                    },
                    include: {
                        items: {
                            where: {
                                isDeleted: false,
                            },
                        },
                        deliveries: {
                            where: {
                                isDeleted: false,
                            },
                        },
                    },
                },
                dueCollections: {
                    where: {
                        isDeleted: false,
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                id: "desc",
            },
        }),
        prisma_1.prisma.customer.count({
            where,
        }),
    ]);
    // const result = customers.map((customer) => {
    //   // মোট কেনা quantity
    //   const totalPurchasedQuantity = customer.challans.reduce(
    //     (challanTotal, challan) => {
    //       return (
    //         challanTotal +
    //         challan.items.reduce(
    //           (itemTotal, item) => itemTotal + item.quantity,
    //           0
    //         )
    //       );
    //     },
    //     0
    //   );
    //   // মোট delivery quantity
    //   const totalDeliveredQuantity = customer.challans.reduce(
    //     (challanTotal, challan) => {
    //       return (
    //         challanTotal +
    //         challan.deliveries.reduce(
    //           (deliveryTotal, delivery) =>
    //             deliveryTotal + delivery.quantity,
    //           0
    //         )
    //       );
    //     },
    //     0
    //   );
    //   // বাকি quantity
    //   const totalRemainingQuantity =
    //     totalPurchasedQuantity - totalDeliveredQuantity;
    //   // মোট বিল
    //   const totalAmount = customer.challans.reduce(
    //     (total, challan) => total + challan.totalPrice,
    //     0
    //   );
    //   // মোট payment
    //   const totalPaid = customer.challans.reduce(
    //     (total, payment) => total + Number(payment?.cash),
    //     0
    //   );
    //   // টাকা বাকি
    //   const totalDue = totalAmount - totalPaid;
    //   return {
    //     id: customer.id,
    //     name: customer.name,
    //     address: customer.address,
    //     phoneNumber: customer.phoneNumber,
    //     totalPurchasedQuantity,
    //     totalDeliveredQuantity,
    //     totalRemainingQuantity,
    //     totalAmount,
    //     totalPaid,
    //     totalDue,
    //     note: customer.note || customer?.challans[0]?.note,
    //     nextPaymentDate: customer.nextPaymentDate,
    //   };
    // });
    const result = (0, customer_utils_1.formatCustomerData)(customers);
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
// GET SINGLE CUSTOMER INFORMATION
const getSingleCustomerInformationService = async (id) => {
    const customer = await prisma_1.prisma.customer.findMany({
        where: {
            isDeleted: false,
            id
        },
        include: {
            challans: {
                where: {
                    isDeleted: false,
                },
                include: {
                    items: {
                        where: {
                            isDeleted: false,
                        },
                    },
                    deliveries: {
                        where: {
                            isDeleted: false,
                        },
                    },
                },
            },
            dueCollections: {
                where: {
                    isDeleted: false,
                },
            },
        },
    });
    const result = (0, customer_utils_1.formatCustomerData)(customer);
    return result[0];
};
// GET CUSTOMER CHALLANS
const getCustomerAllChallanService = async (id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { customerId: id, isDeleted: false };
    // Create start and end of day boundaries
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.challanDate = dateRange;
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.challan.findMany({
            where,
            include: { items: true },
            skip,
            take: limit
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
// GET CUSTOMER CHALLANS
const getCustomerAllDeliveryService = async (id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const chalans = await prisma_1.prisma.challan.findMany({
        where: { customerId: id },
        select: { id: true },
    });
    const chalanIds = chalans.map((c) => c.id);
    const where = {
        invoiceId: { in: chalanIds },
        isDeleted: false,
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.deliveryDate = dateRange;
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.delivery.findMany({
            where,
            skip,
            take: limit,
            include: {
                invoice: {
                    select: {
                        customer: {
                            select: {
                                name: true,
                                address: true,
                            },
                        },
                    },
                },
            },
        }),
        prisma_1.prisma.delivery.count({ where }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
// GET CUSTOMER ALL DUES
const getCustomerAllDuesService = async (id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { customerId: id, isDeleted: false };
    // Create start and end of day boundaries
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.createdAt = dateRange;
        }
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.due_Collection.findMany({
            where,
            // include: { customer: true },
            skip,
            take: limit,
            orderBy: { createdAt: "asc" }
        }),
        prisma_1.prisma.due_Collection.count({ where })
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
exports.CustomerService = {
    getAllCustomerService,
    getSingleCustomerInformationService,
    getCustomerAllChallanService,
    getCustomerAllDeliveryService,
    getCustomerAllDuesService,
    getSingleCustomerService,
    updateCustomerService
};
