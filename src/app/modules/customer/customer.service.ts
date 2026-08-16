import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApplicationError";
import { Customer, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { formatCustomerData } from "./customer.utils";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";


// GET SINGLE INFO
const getSingleCustomerService = async (id: number) => {
  const result = await prisma.customer.findFirst({
    where: { id },
    select: {
      address: true,
      name: true,
      phoneNumber: true,
      id: true
    }
  })
  return result
}

// UPDATE 
const updateCustomerService = async (id: number, data: Customer) => {
  const exist = await getSingleCustomerService(id)
  if (!exist?.id) {
    throw new AppError(StatusCodes.NOT_FOUND, "কোনো কাস্টমার পাওয়া যায়নি।")
  }
  const result = await prisma.customer.update({
    where: { id },
    data: data
  })
  return result
}


const getAllCustomerService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CustomerWhereInput = {
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
    prisma.customer.findMany({
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

    prisma.customer.count({
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
  const result = formatCustomerData(customers)

  const meta = createMetaConfig({
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
const getSingleCustomerInformationService = async (id: number) => {

  const customer = await prisma.customer.findMany({
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
  })

  const result = formatCustomerData(customer)

  return result[0]

}


// GET CUSTOMER CHALLANS
const getCustomerAllChallanService = async (id: number, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.ChallanWhereInput = { customerId: id, isDeleted: false };
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

  return {
    meta,
    data: result,
  };
}



// GET CUSTOMER CHALLANS
const getCustomerAllDeliveryService = async (id: number, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const chalans = await prisma.challan.findMany({
    where: { customerId: id },
    select: { id: true },
  });
  const chalanIds = chalans.map((c) => c.id);

  const where: Prisma.DeliveryWhereInput = {
    invoiceId: { in: chalanIds },
    isDeleted: false,
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
const getCustomerAllDuesService = async (id: number, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.Due_CollectionWhereInput = { customerId: id, isDeleted: false };
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
      // include: { customer: true },
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

export const CustomerService = {
  getAllCustomerService,
  getSingleCustomerInformationService,
  getCustomerAllChallanService,
  getCustomerAllDeliveryService,
  getCustomerAllDuesService,
  getSingleCustomerService,
  updateCustomerService
};
