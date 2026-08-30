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
const getSingleCustomerService = async (user, id) => {
    const result = await prisma_1.prisma.customer.findFirst({
        where: { customerCode: id, vataId: user.vataId },
        select: {
            address: true,
            name: true,
            phoneNumber: true,
            id: true,
            customerCode: true,
        }
    });
    return result;
};
// UPDATE 
const updateCustomerService = async (user, id, data) => {
    const exist = await getSingleCustomerService(user, id);
    if (!exist?.id) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।");
    }
    const result = await prisma_1.prisma.customer.update({
        where: {
            vataId_customerCode: {
                customerCode: id,
                vataId: user.vataId,
            },
        },
        data,
    });
    return result;
};
// const getAllCustomerService = async (user: TAuthUser, query: TQuery) => {
//   const { limit, page, skip } = paginationHelper(query.page, query.limit);
//   const where: Prisma.CustomerWhereInput = {
//     isDeleted: false,
//     vataId: user.vataId,
//   };
//   if (query.search?.trim()) {
//     const search = query.search.trim();
//     where.OR = [
//       {
//         name: {
//           contains: search,
//           mode: "insensitive",
//         },
//       },
//       {
//         customerCode: {
//           contains: search,
//           mode: "insensitive",
//         },
//       },
//       {
//         address: {
//           contains: search,
//           mode: "insensitive",
//         },
//       },
//       {
//         phoneNumber: {
//           contains: search,
//           mode: "insensitive",
//         },
//       },
//     ];
//   }
//   const [customers, total] = await Promise.all([
//     prisma.customer.findMany({
//       where,
//       include: {
//         challans: {
//           where: {
//             isDeleted: false,
//           },
//           include: {
//             items: {
//               where: {
//                 isDeleted: false,
//               },
//             },
//             deliveries: {
//               where: {
//                 isDeleted: false,
//               },
//             },
//           },
//         },
//         dueCollections: {
//           where: {
//             isDeleted: false,
//           },
//           select: {
//             collect: true,
//           },
//           orderBy: { createdAt: "desc" }
//         },
//         customerDues: {
//           select: {
//             dueAmount: true,
//             paidAmount: true,
//             totalAmount: true,
//           },
//           orderBy: { createdAt: "desc" }
//         }
//       },
//       skip,
//       take: limit,
//       orderBy: {
//         id: "desc",
//       },
//     }),
//     prisma.customer.count({
//       where,
//     }),
//   ]);
//   const result = formatCustomerData(customers)
//   console.log(result)
//   const meta = createMetaConfig({
//     limit: limit,
//     page: page,
//     totalData: total,
//   });
//   return {
//     meta,
//     data: result,
//   };
// };
// GET SINGLE CUSTOMER INFORMATION
const getAllCustomerService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        vataId: user.vataId,
    };
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                customerCode: {
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
    const [customers, total, previousDues, previousCollections] = await Promise.all([
        // ==========================================
        // CURRENT SEASON CUSTOMER DATA
        // ==========================================
        prisma_1.prisma.customer.findMany({
            where,
            include: {
                challans: {
                    where: {
                        isDeleted: false,
                        seasonId,
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
                // Current season collection
                dueCollections: {
                    where: {
                        isDeleted: false,
                        seasonId,
                    },
                    select: {
                        collect: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                // Current season due
                customerDues: {
                    where: {
                        seasonId,
                    },
                    select: {
                        dueAmount: true,
                        paidAmount: true,
                        totalAmount: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
            skip,
            take: limit,
            orderBy: {
                customerCode: "desc",
            },
        }),
        // ==========================================
        // TOTAL CUSTOMER
        // ==========================================
        prisma_1.prisma.customer.count({
            where,
        }),
        // ==========================================
        // PREVIOUS ALL SEASON DUE
        // ==========================================
        prisma_1.prisma.customerDue.findMany({
            where: {
                customer: {
                    vataId: user.vataId,
                    isDeleted: false,
                },
                seasonId: {
                    not: seasonId,
                },
            },
            select: {
                customerId: true,
                dueAmount: true,
            },
        }),
        // ==========================================
        // PREVIOUS ALL SEASON COLLECTION
        // ==========================================
        prisma_1.prisma.due_Collection.findMany({
            where: {
                customer: {
                    vataId: user.vataId,
                    isDeleted: false,
                },
                isDeleted: false,
                seasonId: {
                    not: seasonId,
                },
            },
            select: {
                customerId: true,
                collect: true,
            },
        }),
    ]);
    // ==========================================
    // ALL CALCULATION WILL HAPPEN INSIDE UTILITY
    // ==========================================
    const result = (0, customer_utils_1.formatCustomerDataWithPrevDue)(customers, previousDues, previousCollections);
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
const getSingleCustomerInformationService = async (user, seasonId, id) => {
    const findCustomerid = await prisma_1.prisma.customer.findFirst({
        where: {
            vataId: user.vataId, customerCode: id
        }, select: { id: true }
    });
    const [customer, previousDues, previousCollections] = await Promise.all([
        prisma_1.prisma.customer.findMany({
            where: {
                isDeleted: false,
                vataId: user.vataId,
                customerCode: id
            },
            include: {
                challans: {
                    where: {
                        isDeleted: false,
                        seasonId
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
                // Current season collection
                dueCollections: {
                    where: {
                        isDeleted: false,
                        seasonId,
                    },
                    select: {
                        collect: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                // Current season due
                customerDues: {
                    where: {
                        seasonId,
                    },
                    select: {
                        dueAmount: true,
                        paidAmount: true,
                        totalAmount: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            }
        }),
        // FIND CUSTOMER DUE
        prisma_1.prisma.customerDue.findMany({
            where: {
                customerId: findCustomerid?.id,
                seasonId: {
                    not: seasonId,
                },
            },
            select: {
                customerId: true,
                dueAmount: true,
            },
        }),
        // FIND CUSTOMER DUE COLLECTIONS
        prisma_1.prisma.due_Collection.findMany({
            where: {
                isDeleted: false,
                customerId: findCustomerid?.id,
                seasonId: {
                    not: seasonId,
                },
            },
            select: {
                customerId: true,
                collect: true,
            },
        }),
    ]);
    const result = (0, customer_utils_1.formatCustomerDataWithPrevDue)(customer, previousDues, previousCollections);
    return result[0];
};
// const getSingleCustomerInformationService = async (
//   user: TAuthUser,
//   seasonId: string,
//   id: string
// ) => {
//   const customer = await prisma.customer.findMany({
//     where: {
//       isDeleted: false,
//       vataId: user.vataId,
//       customerCode: id,
//     },
//     include: {
//       // =========================
//       // CURRENT SEASON CHALLANS
//       // =========================
//       challans: {
//         where: {
//           isDeleted: false,
//           seasonId,
//         },
//         include: {
//           items: {
//             where: {
//               isDeleted: false,
//             },
//           },
//           deliveries: {
//             where: {
//               isDeleted: false,
//               invoice: {
//                 seasonId,
//               },
//             },
//           },
//         },
//       },
//       // =========================
//       // CURRENT SEASON DUE
//       // =========================
//       customerDues: {
//         where: {
//           seasonId,
//         },
//         select: {
//           dueAmount: true,
//           paidAmount: true,
//           totalAmount: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       },
//       // =========================
//       // CURRENT SEASON COLLECTION
//       // =========================
//       dueCollections: {
//         where: {
//           isDeleted: false,
//           seasonId,
//         },
//         select: {
//           collect: true,
//         },
//       },
//     },
//   });
//   // ==========================================
//   // PREVIOUS ALL SEASON CUSTOMER DUES
//   // ==========================================
//   const previousCustomerDues = await prisma.customerDue.findMany({
//     where: {
//       customer: {
//         vataId: user.vataId,
//         customerCode: id,
//         isDeleted: false,
//       },
//       seasonId: {
//         not: seasonId,
//       },
//     },
//     select: {
//       dueAmount: true,
//       paidAmount: true,
//       totalAmount: true,
//       seasonId: true,
//     },
//   });
//   // ==========================================
//   // PREVIOUS ALL SEASON DUE COLLECTIONS
//   // ==========================================
//   const previousDueCollections = await prisma.due_Collection.findMany({
//     where: {
//       customer: {
//         vataId: user.vataId,
//         customerCode: id,
//         isDeleted: false,
//       },
//       isDeleted: false,
//       seasonId: {
//         not: seasonId,
//       },
//     },
//     select: {
//       collect: true,
//       seasonId: true,
//     },
//   });
//   const result = formatCustomerData(
//     customer,
//     previousCustomerDues,
//     previousDueCollections
//   );
//   return result[0];
// };
// GET CUSTOMER CHALLANS
const getCustomerAllChallanService = async (user, seasonId, id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    console.log(seasonId);
    const where = {
        seasonId,
        vataId: user.vataId,
        customerId: id,
        isDeleted: false
    };
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
    console.log(result);
    return {
        meta,
        data: result,
    };
};
// GET CUSTOMER DELIVERIE
const getCustomerAllDeliveryService = async (user, seasonId, id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const chalans = await prisma_1.prisma.challan.findMany({
        where: { customerId: id, vataId: user.vataId },
        select: { id: true },
    });
    const chalanIds = chalans.map((c) => c.id);
    const where = {
        invoiceId: { in: chalanIds },
        isDeleted: false,
        invoice: {
            vataId: user.vataId,
            seasonId
        }
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
                        id: true,
                        serial: true,
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
const getCustomerAllDuesService = async (user, seasonId, id, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        customerId: id, isDeleted: false, customer: { vataId: user.vataId },
        seasonId
    };
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
            include: {
                customer: {
                    select: {
                        customerCode: true
                    }
                }
            },
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
// GET OLD CUSTOMERS 
const getOldCustomerService = async (user, search) => {
    console.log(search);
    const result = await prisma_1.prisma.customer.findMany({
        where: {
            vataId: user.vataId,
            isDeleted: false,
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    phoneNumber: {
                        contains: search,
                    },
                },
                // {
                //   customerCode: {
                //     contains: search,
                //     mode: "insensitive",
                //   },
                // },
                // {
                //   address: {
                //     customerCode: search,
                //     mode: "insensitive",
                //   },
                // },
            ],
        },
        select: {
            name: true,
            phoneNumber: true,
            address: true,
            id: true,
            customerCode: true
        },
    });
    return result;
};
exports.CustomerService = {
    getAllCustomerService,
    getSingleCustomerInformationService,
    getCustomerAllChallanService,
    getCustomerAllDeliveryService,
    getCustomerAllDuesService,
    getSingleCustomerService,
    updateCustomerService,
    getOldCustomerService,
};
