import {
  Challan,
  ChallanItem,
  Customer,
  Prisma,
} from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { generateCode } from "../../../utils/generateCode";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

// CREATE CUSTOMER AND INVOICE AND INVOICE ITEMS
const createInvoiceService = async (
  user: TAuthUser,
  seasonId: string,
  customer: Customer,
  invoiceItems: ChallanItem[],
  invoice: Challan,
) => {
  const isSerialExist = await prisma.challan.findFirst({
    where: {
      vataId: user.vataId,
      serial: invoice.serial,
    },
  });

  if (isSerialExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "চালান নম্বর পরিবর্তন করুন",
    );
  }
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // CHECK CUSTOMER EXIST OR NOT
      let existingCustomer = await tx.customer.findFirst({
        where: {
          vataId: user.vataId,
          phoneNumber: customer.phoneNumber,
        },
      });

      // IF CUSTOMER IS NOT EXIST THEN CREATE NEW
      if (!existingCustomer) {
        const countCustomer =
          (await tx.customer.count({
            where: {
              vataId: user.vataId,
            },
          })) + 1;

        existingCustomer = await tx.customer.create({
          data: {
            ...customer,
            customerCode: generateCode(countCustomer),
            vataId: user.vataId,
            nextPaymentDate: invoice.duePaymentDate,
          },
        });
      } else {
        // IF CUSTOMER ALREADY EXISTS THEN UPDATE NEXT PAYMENT DATE
        existingCustomer = await tx.customer.update({
          where: {
            id: existingCustomer.id,
          },
          data: {
            nextPaymentDate: invoice.duePaymentDate,
          },
        });
      }

      //  CREATE INVOICE
      invoice.customerId = existingCustomer.id;
      invoice.createdById = user.userId;
      const newInvoice = await tx.challan.create({
        data: {
          ...invoice,
          vataId: user.vataId,
          seasonId,

        },
      });

      // CREATE CUSTOMER DUE INFO
      await tx.customerDue.create({
        data: {
          dueAmount: Number(invoice.due ?? 0),
          paidAmount: Number(invoice.cash ?? 0),
          totalAmount: invoice.totalPrice,
          challanId: newInvoice.id,
          customerId: newInvoice.customerId,
          seasonId: seasonId,
        }
      })

      //  FORMAT INVOKE ITEMS AND ADD INVOICE ID
      const invokeInvoiceId = invoiceItems.map((it: ChallanItem) => {
        return {
          class: it.class,
          rate: Number(it.rate),
          quantity: Number(it.quantity),
          price: Number(it.price),
          challanId: newInvoice.id,
          deliveryDate: invoice.deliveryDate,
        };
      });

      // CREATE ITEMS OF CHALLAN
      await tx.challanItem.createMany({
        data: invokeInvoiceId,
      });
      return newInvoice;
    },
  );
  return result;
};


// SEARCH CHALLANS FOR DELIVERY
const searchChallanForDeliveryService = async (
  user: TAuthUser,
  query: TQuery,
) => {
  const searchTerm = query.search?.trim();
  if (!searchTerm) {
    return {
      success: true,
      message: "চালান সার্চ সফল হয়েছে",
      data: [],
    };
  }

  const searchConditions: Prisma.ChallanWhereInput[] = [
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

  const where: Prisma.ChallanWhereInput = {
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

  const result = await prisma.challan.findMany({
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

  return result
};



// GET AL INVOICE WITH CUSTOMER NAME AND ADDRESS
const getAllInvoiceService = async (user: TAuthUser, seasonId: string, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.ChallanWhereInput = { vataId: user.vataId, isDeleted: false, seasonId: seasonId };
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
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.challanDate = dateRange;
    }
  }

  const [result, total] = await prisma.$transaction([
    prisma.challan.findMany({
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

};

// GET ADVANCE INVOICE
const getAllAdvanceInvoiceService = async (user: TAuthUser, seasonId: string, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.ChallanWhereInput = {
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

  const [result, total] = await prisma.$transaction([
    prisma.challan.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
        items: true,
      }, skip, take: limit
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

};


//  GET SINGLE INVOICE
const getSingleInvoiceService = async (user: TAuthUser, id: string) => {
  const result = await prisma.challan.findFirst({
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
      }, season: {
        select: {
          name: true,
          id: true
        }
      }
    },
  });
  return result;
};

//  GET SINGLE INVOICE ITEMS
const getSingleInvoiceItemsService = async (user: TAuthUser, id: string, query: string) => {
  const splitIds = query.split(",");
  const parsedNumber = splitIds.map((id) => id);
  const challanId = await prisma.challan.findFirst({
    where: { serial: Number(id), vataId: user.vataId },
    select: { id: true }
  })
  const result = await prisma.challanItem.findMany({
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
const updateInvoiceService = async (
  user: TAuthUser,
  serialId: string,
  invoice: Challan,
  items: ChallanItem[],
) => {
  const invoiceId = await prisma.challan.findFirst({
    where: { serial: Number(serialId), vataId: user.vataId }, select: { id: true }
  })


  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
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
      await Promise.all(
        existItems?.map((item) =>
          tx.challanItem.update({
            where: { id: item.id },
            data: {
              quantity: Number(item.quantity),
              rate: Number(item.rate),
              class: item.class,
              price: Number(item.price),
              deliveryDate: invoice.deliveryDate,
            },
          }),
        ),
      );

      // CREATE NEW INVOICE AFTER UPDATE IF THERE ANY NEW ITEM ADDED
      if (newItems?.length) {
        const invokeInvoiceId = newItems.map((it: ChallanItem) => {
          return {
            class: it.class,
            rate: Number(it.rate),
            quantity: Number(it.quantity),
            price: Number(it.price),
            challanId: invoiceId?.id!,
            deliveryDate: invoice.deliveryDate,
          };
        });
        await tx.challanItem.createMany({
          data: invokeInvoiceId,
        });
      }
      return updateInvoice;
    },
  );
  return result;
};

// DELETE INVOICE
const deleteInvoiceService = async (user: TAuthUser, invoiceId: string) => {
  const result = await prisma.challan.update({
    data: {
      isDeleted: true,
    },
    where: {
      id: invoiceId,
      vataId: user.vataId
    },
  });

  await prisma.challanItem.updateMany({
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
const getItemsWithInvoiceService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery
) => {
  const whereCondition: Prisma.ChallanItemWhereInput = {
    isDeleted: false,
    challan: {
      vataId: user.vataId,
      seasonId,
    }
  };


  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      whereCondition.challan = {
        challanDate: dateRange,
      };
    }
  }


  if (query.search === "ADVANCED") {
    whereCondition.challan = {
      chalanType: "অগ্রিম চালান"
    }
  }

  const result = await prisma.challanItem.findMany({
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
const updateItemsDateService = async (
  user: TAuthUser,
  id: string,
  updateDate: string,
) => {

  const result = await prisma.challanItem.update({
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
const updateInvoiceDeliveryDateService = async (user: TAuthUser, id: string, updatedDate: string) => {
  const challanId = await prisma.challan.findFirst({
    where: {
      serial: Number(id),
      vataId: user.vataId
    },
    select: { id: true }
  })

  const result = await prisma.challan.update({
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



export const InvoiceService = {
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
  searchChallanForDeliveryService
};

