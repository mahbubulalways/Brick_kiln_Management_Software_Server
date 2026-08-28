import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApplicationError";
import { Customer, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { formatCustomerData, formatCustomerDataWithPrevDue } from "./customer.utils";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { TAuthUser } from "../../../interface/token";


// GET SINGLE INFO
const getSingleCustomerService = async (user: TAuthUser, id: string) => {
  const result = await prisma.customer.findFirst({
    where: { customerCode: id, vataId: user.vataId },
    select: {
      address: true,
      name: true,
      phoneNumber: true,
      id: true,
      customerCode: true,
    }
  })
  return result
}

// UPDATE 
const updateCustomerService = async (user: TAuthUser, id: string, data: Customer) => {
  const exist = await getSingleCustomerService(user, id)
  if (!exist?.id) {
    throw new AppError(StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।")
  }
  const result = await prisma.customer.update({
    where: {
      vataId_customerCode: {
        customerCode: id,
        vataId: user.vataId,
      },
    },
    data,
  });
  return result
}


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

const getAllCustomerService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery
) => {
  const { limit, page, skip } = paginationHelper(
    query.page,
    query.limit
  );

  const where: Prisma.CustomerWhereInput = {
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

  const [customers, total, previousDues, previousCollections] =
    await Promise.all([
      // ==========================================
      // CURRENT SEASON CUSTOMER DATA
      // ==========================================
      prisma.customer.findMany({
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
          id: "desc",
        },
      }),

      // ==========================================
      // TOTAL CUSTOMER
      // ==========================================
      prisma.customer.count({
        where,
      }),

      // ==========================================
      // PREVIOUS ALL SEASON DUE
      // ==========================================
      prisma.customerDue.findMany({
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
      prisma.due_Collection.findMany({
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

  const result = formatCustomerDataWithPrevDue(
    customers,
    previousDues,
    previousCollections
  );

  const meta = createMetaConfig({
    limit,
    page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};



const getSingleCustomerInformationService = async (user: TAuthUser, seasonId: string, id: string) => {
  const findCustomerid = await prisma.customer.findFirst({
    where: {
      vataId: user.vataId, customerCode: id
    }, select: { id: true }
  })

  const [customer, previousDues, previousCollections] = await Promise.all([
    prisma.customer.findMany({
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
      },


      orderBy: {
        id: "desc",
      },
    }),

    // FIND CUSTOMER DUE
    prisma.customerDue.findMany({
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
    prisma.due_Collection.findMany({
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
  ])


  const result = formatCustomerDataWithPrevDue(
    customer,
    previousDues,
    previousCollections
  );

  return result[0]

}

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
const getCustomerAllChallanService = async (user: TAuthUser, seasonId: string, id: string, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  console.log(seasonId)
  const where: Prisma.ChallanWhereInput = {
    seasonId,
    vataId: user.vataId,
    customerId: id,
    isDeleted: false
  };
  // Create start and end of day boundaries
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.challanDate = dateRange;
    }
  }

  const [result, total] = await Promise.all([
    prisma.challan.findMany({
      where,
      include: { items: true },
      skip,
      take: limit
    }),
    prisma.challan.count({ where })
  ])
  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  console.log(result)

  return {
    meta,
    data: result,
  };
}

// GET CUSTOMER DELIVERIE
const getCustomerAllDeliveryService = async (user: TAuthUser, seasonId: string, id: string, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const chalans = await prisma.challan.findMany({
    where: { customerId: id, vataId: user.vataId },
    select: { id: true },
  });
  const chalanIds = chalans.map((c) => c.id);

  const where: Prisma.DeliveryWhereInput = {
    invoiceId: { in: chalanIds },
    isDeleted: false,
    invoice: {
      vataId: user.vataId,
      seasonId
    }
  };

  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.deliveryDate = dateRange;
    }
  }

  const [result, total] = await Promise.all([
    prisma.delivery.findMany({
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
    prisma.delivery.count({ where }),
  ]);

  const meta = createMetaConfig({
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
const getCustomerAllDuesService = async (
  user: TAuthUser,
  seasonId: string,
  id: string,
  query: TQuery
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.Due_CollectionWhereInput = {
    customerId: id, isDeleted: false, customer: { vataId: user.vataId },
    seasonId
  };

  // Create start and end of day boundaries
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.createdAt = dateRange;
    }
  }

  const [result, total] = await Promise.all([
    prisma.due_Collection.findMany({
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
    prisma.due_Collection.count({ where })
  ])
  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
}


// GET OLD CUSTOMERS 
const getOldCustomerService = async (
  user: TAuthUser,
  search: string
) => {
  console.log(search)
  const result = await prisma.customer.findMany({
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

export const CustomerService = {
  getAllCustomerService,
  getSingleCustomerInformationService,
  getCustomerAllChallanService,
  getCustomerAllDeliveryService,
  getCustomerAllDuesService,
  getSingleCustomerService,
  updateCustomerService,
  getOldCustomerService,
};
