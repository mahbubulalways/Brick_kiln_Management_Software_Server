import { TDelivery } from "./deliveryinterface";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { TAuthUser } from "../../../interface/token";

const getNextDeliveryNo = async (user: TAuthUser) => {
  const result = await prisma.delivery.findFirst({
    where: {
      invoice: {
        vataId: user.vataId,
      }
    },
    orderBy: {
      deliveryNo: "desc",
    },
    select: {
      deliveryNo: true,
    },
  });

  return result ? result.deliveryNo + 1 : 1;
};

const getDeliveryThatGoTodayService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.ChallanWhereInput = { vataId: user.vataId, isDeleted: false };

  // Create start and end of day boundaries

  if (query.search?.trim()) {
    const search = query.search.trim();
    const isNumber = !isNaN(Number(search));
    where.OR = [
      ...(isNumber
        ? [
          {
            serial: Number(search),
          },
        ]
        : []),
      {
        customer: {
          is: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
      {
        customer: {
          is: {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
    ];
  }

  const dateRange = query.date
    ? getDateRangeDbSearch(query.date)
    : undefined;
  if (query.date) {
    if (dateRange) {
      where.items = {
        some: {
          deliveryDate: dateRange,
        },
      };
    }
  }
  // Create start and end of day boundaries

  // Fetch deliveries within the day
  const [result, total] = await prisma.$transaction([
    prisma.challan.findMany({
      where,
      select: {
        id: true,
        customer: true,
        serial: true,
        items: {
          where: dateRange
            ? {
              deliveryDate: dateRange,
            }
            : undefined,
        },
      },
      orderBy: {
        deliveryDate: "asc",
      }, skip,
      take: limit
    }),
    prisma.challan.count({ where })
  ]);

  // Filter out challans with no items
  const filteredResult = result.filter((challan) => challan.items.length > 0);
  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  return {
    meta,
    data: filteredResult.length > 0 ? filteredResult : [],
  };
};

// CREATE DELIVERY
const createDeliveryService = async (user: TAuthUser, payload: TDelivery) => {
  const isDeliveryNoExist = await prisma.delivery.findFirst({
    where: {
      deliveryNo: Number(payload?.deliveryNo),
    },
  });

  if (isDeliveryNoExist?.id) {
    throw new AppError(StatusCodes.CONFLICT, "এই ডেলিভারি নম্বর ইতিমধ্যে আছে");
  }


  // HERE COME SERIAL ID AS INVOICE ID 
  const mainInvoiceId = await prisma.challan.findFirst({
    where: { serial: Number(payload.invoiceId), vataId: user.vataId }, select: { id: true }
  },)
  const data = {
    deliveryDate: payload.deliveryDate,
    deliveryNo: Number(payload.deliveryNo),
    nextDeliveryDate: payload.nextDeliveryDate,
    quantity: Number(payload.items.quantity),
    deliveryReceived: Number(payload.items.todaysDelivery),
    class: payload.items.class,
    deliveryRemaining: Number(payload.items.remainingDelivery),
    driverName: payload.driverName,
    driverPhoneNumber: payload.driverMobileNumber,
    carNo: payload.carNumber,
    invoiceId: mainInvoiceId?.id!,
    carRent: Number(payload.carRent),
    deliveryById: user.userId
  };


  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const createDelivery = await tx.delivery.create({
        data: {
          deliveryDate: data.deliveryDate,
          class: data.class,
          deliveryNo: data.deliveryNo,
          deliveryReceived: data.deliveryReceived,
          deliveryRemaining: data.deliveryRemaining,
          nextDeliveryDate: data.nextDeliveryDate,
          quantity: data.quantity,
          carNo: data.carNo,
          driverName: data.driverName,
          driverPhoneNumber: data.driverPhoneNumber,
          invoiceId: data.invoiceId,
          carRent: data.carRent,
          deliveryById: data.deliveryById,
        },
      });

      if (data?.deliveryRemaining) {
        const update = await tx.challanItem.update({
          data: {
            deliveryDate: data.nextDeliveryDate,
          },
          where: {
            id: payload.itemId,
          },
        });

      }

      const updateItem = await tx.challanItem.update({
        data: {
          delivered: {
            increment: data?.deliveryReceived,
          },
        },
        where: {
          id: payload?.itemId,
        },
      });

      return createDelivery;
    },
  );
  return result;
};

//

const getTodaysDeliveryThatDone = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.DeliveryWhereInput = {
    isDeleted: false, invoice: {
      vataId: user.vataId
    }
  };

  // Create start and end of day boundaries
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.deliveryDate = dateRange;
    }
  }
  const [result, total] = await prisma.$transaction([
    prisma.delivery.findMany({
      where,
      include: {
        invoice: {
          select: {
            serial: true,
            customer: true,
          },
        },
      }, skip, take: limit, orderBy: { createdAt: "desc" }
    }),

    prisma.delivery.count({ where })

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

// GET ALL DELIVERY

const getAllDeliveryListService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(
    query.page,
    query.limit,
  );

  const where: Prisma.ChallanWhereInput = {
    isDeleted: false,
    vataId: user.vataId,
  };

  // Date range
  const dateRange = query.date
    ? getDateRangeDbSearch(query.date)
    : undefined;

  // Filter challan by item delivery date
  if (dateRange) {
    where.items = {
      some: {
        deliveryDate: dateRange,
      },
    };
  }

  // Search
  if (query.search?.trim()) {
    const search = query.search.trim();
    const isNumber = !isNaN(Number(search));

    where.OR = [
      ...(isNumber
        ? [
          {
            serial: Number(search),
          },
        ]
        : []),

      {
        customer: {
          is: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },

      {
        customer: {
          is: {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      },
    ];
  }

  const [result, total] = await prisma.$transaction([
    prisma.challan.findMany({
      where,
      select: {
        id: true,
        serial: true,
        note: true,
        customer: true,
        items: {
          where: dateRange
            ? {
              deliveryDate: dateRange,
            }
            : undefined,
        },
      },
      orderBy: {
        deliveryDate: "asc",
      }, skip,
      take: limit
    }),

    prisma.challan.findMany({
      where,
      select: {
        items: {
          where: dateRange
            ? {
              deliveryDate: dateRange,
            }
            : undefined,
        },
      },
    }),
  ]);



  const filteredResult = result
    .map((challan) => ({
      ...challan,
      items: challan.items.filter(
        (item) => item.quantity > item.delivered
      ),
    }))
    .filter((challan) => challan.items.length > 0);

  const totalCount = total.map((challan) => ({
    ...challan,
    items: challan.items.filter(
      (item) => item.quantity > item.delivered
    ),
  }))
    .filter((challan) => challan.items.length > 0).length;

  const meta = createMetaConfig({
    limit,
    page,
    totalData: totalCount,
  });

  return {
    meta,
    data: filteredResult,
  };
};

const getSingleDeliveryService = async (id: string) => {
  const result = await prisma.delivery.findFirst({
    where: { id }, include: {
      invoice: {
        select: {
          id: true,
          serial: true,
          challanDate: true,
          deliveryDate: true,

          customer: {
            select: {
              name: true,
              phoneNumber: true,
              address: true
            }
          }
        }
      },
      deliveryBy: {
        select: {
          name: true
        }
      },
    }
  });
  return result;
};

export const DeliveryService = {
  getNextDeliveryNo,
  getDeliveryThatGoTodayService,
  createDeliveryService,
  getTodaysDeliveryThatDone,
  getAllDeliveryListService,
  getSingleDeliveryService,
};
