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
import { getStockByClass } from "./delivery.utils";

const getNextDeliveryNo = async (user: TAuthUser) => {
  const result = await prisma.delivery.findFirst({
    where: {
      invoice: {
        vataId: user.vataId,
      },
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

// CREATE DELIVERY
const createDeliveryService = async (user: TAuthUser, payload: TDelivery) => {
  const isDeliveryNoExist = await prisma.delivery.findFirst({
    where: {
      deliveryNo: Number(payload?.deliveryNo),
      invoice: {
        vataId: user.vataId,
      },
    },
    include: {
      invoice: true,
    },
  });

  if (isDeliveryNoExist?.id) {
    throw new AppError(StatusCodes.CONFLICT, "এই ডেলিভারি নম্বর ইতিমধ্যে আছে");
  }

  // // HERE COME SERIAL ID AS INVOICE ID
  const mainInvoiceId = await prisma.challan.findFirst({
    where: {
      serial: Number(payload.invoiceId),
      vataId: user.vataId,
    },
    select: { id: true, seasonId: true },
  });

  const checkStockQuantity = await getStockByClass(
    user,
    mainInvoiceId?.seasonId!,
    payload.items.class,
  );

  if (checkStockQuantity < payload.items.todaysDelivery) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `পর্যাপ্ত ইট নেই। বর্তমানে ${checkStockQuantity} টি ইট আছে, 
       কিন্তু ${payload.items.quantity} টি ইট প্রয়োজন।`,
    );
  }

  const lastDelivered = await prisma.delivery.aggregate({
    where: {
      invoiceId: mainInvoiceId?.id,
      class: payload.items.class,
    },
    _sum: {
      deliveryReceived: true,
    },
  });

  const totalDelivered = lastDelivered._sum.deliveryReceived || 0;
  const data = {
    deliveryDate: payload.deliveryDate,
    deliveryNo: Number(payload.deliveryNo),
    nextDeliveryDate: payload.nextDeliveryDate,
    quantity: Number(payload.items.quantity),
    deliveryReceived: Number(payload.items.todaysDelivery),
    class: payload.items.class,
    deliveryRemaining: Number(payload.items.remainingDelivery),
    carNo: payload.carNumber,
    invoiceId: mainInvoiceId?.id!,
    carRent: Number(payload.carRent),
    deliveryById: user.userId,
    driverId: payload.driverId,
    lastDelivered: totalDelivered,
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
          invoiceId: data.invoiceId,
          carRent: data.carRent,
          deliveryById: data.deliveryById,
          driverId: data.driverId,
          lastDelivered: totalDelivered,
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

      await tx.challanItem.update({
        data: {
          delivered: {
            increment: data?.deliveryReceived,
          },
        },
        where: {
          id: payload?.itemId,
        },
      });

      const carRent = Number(payload?.carRent);
      if (carRent && payload?.carNumber) {
        const car = await tx.vataCar.findFirst({
          where: {
            carNo: payload.carNumber,
            vataId: user.vataId,
          },
          select: {
            id: true,
          },
        });
        if (!car) {
          throw new AppError(StatusCodes.NOT_FOUND, "এই গাড়িটি পাওয়া যায়নি");
        }
        await tx.carIncomeDelivery.create({
          data: {
            amount: carRent,
            carId: car?.id,
            deliveryId: createDelivery?.id,
            driverId: payload.driverId,
          },
        });
      }

      return createDelivery;
    },
  );
  return result;
};

// GET DELIVERIES THAT GO TODAT
const getDeliveryThatGoTodayService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.ChallanWhereInput = {
    vataId: user.vataId,
    isDeleted: false,
    seasonId,
  };

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

  const dateRange = query.date ? getDateRangeDbSearch(query.date) : undefined;
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
      },
      skip,
      take: limit,
    }),
    prisma.challan.count({ where }),
  ]);

  // Filter out challans with no items
  const filteredResult = result
    .filter((challan) => challan.items.length > 0)
    .filter((challan) =>
      challan.items.some(
        (item) => Number(item.delivered) < Number(item.quantity),
      ),
    );

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

// GET DELIVERIES THAT DONE TODAY
const getTodaysDeliveryThatDone = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.DeliveryWhereInput = {
    isDeleted: false,
    invoice: {
      vataId: user.vataId,
      seasonId,
    },
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
        driver: {
          select: {
            name: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),

    prisma.delivery.count({ where }),
  ]);
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
const getAllDeliveryListService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const where: Prisma.ChallanWhereInput = {
    isDeleted: false,
    vataId: user.vataId,
    seasonId,
  };

  // Date range
  const dateRange = query.date ? getDateRangeDbSearch(query.date) : undefined;

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
        customer: {
          include: {
            customerDues: {
              select: {
                dueAmount: true,
              },
            },
            dueCollections: {
              select: {
                collect: true,
              },
            },
          },
        },
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
      },
      skip,
      take: limit,
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
    .map((challan) => {
      const totalDueAmount =
        challan.customer?.customerDues?.reduce(
          (sum, due) => sum + Number(due.dueAmount || 0),
          0,
        ) || 0;

      const totalCollected =
        challan.customer?.dueCollections?.reduce(
          (sum, collection) => sum + Number(collection.collect || 0),
          0,
        ) || 0;

      const totalDue = Math.max(totalDueAmount - totalCollected, 0);

      return {
        ...challan,
        totalDueAmount,
        totalCollected,
        totalDue,
        items: challan.items.filter((item) => item.quantity > item.delivered),
      };
    })
    .filter((challan) => challan.items.length > 0);

  const totalCount = total
    .map((challan) => ({
      ...challan,
      items: challan.items.filter((item) => item.quantity > item.delivered),
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
    where: { id },
    include: {
      invoice: {
        select: {
          id: true,
          serial: true,
          challanDate: true,
          deliveryDate: true,
          totalPrice: true,
          items: {
            select: {
              rate: true,
              price: true,
            },
          },

          customer: {
            select: {
              name: true,
              phoneNumber: true,
              address: true,
            },
          },
        },
      },
      driver: {
        select: {
          name: true,
          PhoneNumber: true,
        },
      },
      deliveryBy: {
        select: {
          name: true,
        },
      },
    },
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
