import { TDelivery } from "./deliveryinterface";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import { DeliveryStatus, Prisma } from "../../../generated/prisma/client";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { TAuthUser } from "../../../interface/token";
import { getStockByClass } from "./delivery.utils";
import { ActivityService } from "../activity/activity.service";

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

  const car = await prisma.vataCar.findFirst({
    where: {
      carNo: payload?.carNumber,
      vataId: user.vataId,
    },
    select: {
      id: true,
    },
  });
  if (!car) {
    throw new AppError(StatusCodes.NOT_FOUND, "এই গাড়িটি পাওয়া যায়নি");
  }

  if (isDeliveryNoExist?.id) {
    throw new AppError(StatusCodes.CONFLICT, "এই ডেলিভারি নম্বর ইতিমধ্যে আছে");
  }

  // // HERE COME SERIAL ID AS INVOICE ID
  const mainInvoiceId = await prisma.challan.findFirst({
    where: {
      serial: Number(payload.invoiceId),
      vataId: user.vataId,
    },
    select: { id: true, seasonId: true, carRent: true },
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
      isDeleted: false,
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

      // await tx.challanItem.update({
      //   data: {
      //     delivered: {
      //       increment: data?.deliveryReceived,
      //     },
      //   },
      //   where: {
      //     id: payload?.itemId,
      //   },
      // });

      await tx.deliveryStatusActionTime.create({
        data: {
          processingTime: new Date(),
          deliveryId: createDelivery.id,
        },
      });
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
        deliveryDate: "desc",
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

  if (query.search?.trim()) {
    const search = query.search.trim();
    const isNumber = !isNaN(Number(search));
    if (isNumber) {
      where.OR = [
        {
          invoice: {
            serial: Number(search),
          },
        },
      ];
    }
    where.OR = [
      {
        invoice: {
          customer: {
            is: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      },
      // {
      //   invoice: {
      //     customer: {
      //       is: {
      //         address: {
      //           contains: search,
      //           mode: "insensitive",
      //         },
      //       },
      //     },
      //   },
      // },

      {
        invoice: {
          customer: {
            is: {
              phoneNumber: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      },
    ];
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
      deliveryStatusActionTimes: true,
    },
  });
  return result;
};

// CHANGE DELIVERY STATUS
const changeDeliveryStatusService = async (
  id: string,
  status: DeliveryStatus,
) => {
  const findDelivery = await prisma.delivery.findFirst({
    where: { id },
    select: {
      id: true,
      invoiceId: true,
      class: true,
      deliveryReceived: true,
      carRent: true,
      driverId: true,
      carNo: true,
      invoice: {
        select: {
          vataId: true,
        },
      },
    },
  });
  await prisma.delivery.update({ where: { id }, data: { status: status } });
  const findItem = await prisma.challanItem.findFirst({
    where: {
      challanId: findDelivery?.invoiceId as string,
      class: findDelivery?.class as string,
    },
    select: {
      id: true,
    },
  });

  let result;
  if (status === "DELIVERED") {
    result = await prisma.challanItem.update({
      where: {
        id: findItem?.id,
      },
      data: {
        delivered: { increment: findDelivery?.deliveryReceived },
      },
    });

    // CAR RENT AND DRIVER ASSIGN
    if (findDelivery?.carRent && findDelivery?.carNo) {
      const car = await prisma.vataCar.findFirst({
        where: {
          carNo: findDelivery?.carNo,
          vataId: findDelivery.invoice.vataId,
        },
        select: {
          id: true,
        },
      });
      if (!car) {
        throw new AppError(StatusCodes.NOT_FOUND, "এই গাড়িটি পাওয়া যায়নি");
      }
      await prisma.carIncomeDelivery.create({
        data: {
          amount: findDelivery.carRent,
          carId: car?.id,
          deliveryId: findDelivery?.id,
          driverId: findDelivery?.driverId!,
        },
      });
    }

    await prisma.deliveryStatusActionTime.update({
      where: { deliveryId: id },
      data: { deliveredTime: new Date() },
    });

    return result;
  } else if (status === "CANCEL") {
    result = await prisma.challanItem.update({
      where: {
        id: findItem?.id,
      },
      data: {
        delivered: { decrement: findDelivery?.deliveryReceived },
      },
    });

    await prisma.deliveryStatusActionTime.update({
      where: { deliveryId: id },
      data: { cancelTime: new Date() },
    });

    return result;
  } else if (status === "PROCESSING") {
    result = await prisma.challanItem.update({
      where: {
        id: findItem?.id,
      },
      data: {
        delivered: { decrement: findDelivery?.deliveryReceived },
      },
    });

    if (findDelivery?.carNo) {
      await prisma.carIncomeDelivery.delete({
        where: { deliveryId: findDelivery.id },
      });
    }
    await prisma.deliveryStatusActionTime.update({
      where: { deliveryId: id },
      data: { processingTime: new Date() },
    });
    return result;
  }

  return result;
};

// DELETE DELIVERY
const deleteDeliveryService = async (user: TAuthUser, id: string) => {
  const findDelivery = await prisma.delivery.findFirst({ where: { id } });
  if (!findDelivery) {
    throw new AppError(StatusCodes.NOT_FOUND, "কোনো ডেলিভারি পাওয়া যায়নি।");
  }
  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const findItem = await tx.challan.findFirst({
        where: {
          id: findDelivery.invoiceId,
          vataId: user.vataId,
          isDeleted: false,
        },
        select: {
          items: {
            where: {
              class: findDelivery.class,
            },
            select: {
              id: true,
            },
          },
        },
      });

      const itemId = findItem?.items[0]?.id;

      if (!itemId) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "চালানের সংশ্লিষ্ট আইটেম পাওয়া যায়নি।",
        );
      }

      const delivery = await tx.delivery.update({
        where: {
          id,
          invoice: { vataId: user.vataId },
        },
        data: {
          isDeleted: true,
          deleteStatus: "APPROVED",
        },
      });

      if (findDelivery?.status === "DELIVERED") {
        await tx.challanItem.update({
          where: {
            id: itemId,
          },
          data: {
            delivered: {
              decrement: findDelivery.deliveryReceived,
            },
          },
        });
      }

      if (findDelivery?.carNo) {
        const carIncomeDelivery = await tx.carIncomeDelivery.findFirst({
          where: {
            deliveryId: findDelivery.id,
          },
        });

        if (carIncomeDelivery) {
          await tx.carIncomeDelivery.delete({
            where: {
              id: carIncomeDelivery.id,
            },
          });
        }
      }

      await ActivityService.createActivityService({
        action: "DELETE",
        module: "DELIVERY",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        referenceNumber: findDelivery.deliveryNo,
      });

      return delivery;
    });

    return {
      result,
      message: "ডেলিভারিটি সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  // HERE REQUEST CREATE FOR DELETE
  const result = await prisma.$transaction(async (tx) => {
    await tx.delivery.update({
      where: {
        id,
        invoice: {
          vataId: user.vataId,
        },
      },
      data: {
        deleteStatus: "PENDING",
      },
    });
    const oldData = {
      deliveryDate: findDelivery.deliveryDate,
      deliveryNo: findDelivery.deliveryNo,
      nextDeliveryDate: findDelivery.nextDeliveryDate,
      quantity: findDelivery.quantity,
      lastDelivered: findDelivery.lastDelivered,
      deliveryReceived: findDelivery.deliveryReceived,
      class: findDelivery.class,
      deliveryRemaining: findDelivery.deliveryRemaining,
    };

    return tx.approvalRequest.create({
      data: {
        action: "DELETE",
        module: "DELIVERY",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        oldData: oldData,
      },
    });
  });

  return {
    result,
    message: "ডেলিভারিটি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

export const DeliveryService = {
  getNextDeliveryNo,
  getDeliveryThatGoTodayService,
  createDeliveryService,
  getTodaysDeliveryThatDone,
  getAllDeliveryListService,
  getSingleDeliveryService,
  changeDeliveryStatusService,
  deleteDeliveryService,
};
