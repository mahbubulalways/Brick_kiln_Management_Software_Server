import { StatusCodes } from "http-status-codes";
import { Prisma, StockBook } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../errors/ApplicationError";
import { ActivityService } from "../activity/activity.service";

// CREATE STOCK BOOK SERVICE
const createStockBookService = async (
  user: TAuthUser,
  seasonId: string,
  payload: StockBook,
) => {
  payload.createdById = user.userId;
  payload.seasonId = seasonId;
  payload.vataId = user.vataId;
  const result = await prisma.stockBook.create({ data: payload });
  return result;
};

// GET ALL STOCK
const getAllStockService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const [result, total] = await Promise.all([
    prisma.stockBook.findMany({
      where: { isDeleted: false, seasonId, vataId: user.vataId },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
      },
      take: limit,
      skip,
    }),
    prisma.stockBook.count({
      where: { isDeleted: false, seasonId, vataId: user.vataId },
    }),
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

// DELETE
const deleteStockService = async (user: TAuthUser, id: string) => {
  const existingStock = await prisma.stockBook.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!existingStock) {
    throw new AppError(StatusCodes.NOT_FOUND, "স্টকের তথ্য পাওয়া যায়নি।");
  }

  const oldData = {
    name: existingStock.class,
    stockIn: existingStock.stockIn,
    stockOut: existingStock.stockOut,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      await tx.stockBook.delete({
        where: { id },
      });

      return await ActivityService.createActivityService({
        action: "DELETE",
        module: "STOCK",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
        referenceNumber: `${existingStock.class} | ইন: ${existingStock.stockIn} | আউট: ${existingStock.stockOut}`,
      });
    });

    return {
      result,
      message: "স্টকের তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  const result = await prisma.stockBook.update({
    where: { id },
    data: {
      deleteStatus: "PENDING",
    },
  });

  await prisma.approvalRequest.create({
    data: {
      action: "DELETE",
      module: "STOCK",
      targetId: id,
      requestedById: user.userId,
      vataId: user.vataId,
      status: "PENDING",
      oldData,
    },
  });

  return {
    result,
    message: "স্টকের তথ্য মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

// GET MAIN STOCK
// const getMainStockInformation = async (user: TAuthUser, seasonId: string) => {
//   const allClass = await prisma.classAndRate.findMany({
//     where: { isDeleted: false, vataId: user.vataId }, select: { className: true, rate:true}
//   })
//   const allStock = await prisma.stockBook.findMany({
//     where: {
//       isDeleted: false, seasonId, vataId: user.vataId
//     }, select: {
//       stockIn: true,
//       class: true,
//       stockOut: true
//     }
//   })

//   const challans = await prisma.challan.findMany({
//     where: {
//       seasonId,
//       vataId: user.vataId,
//       isDeleted: false
//     },
//     select: {
//       items: {
//         where: {
//           isDeleted: false
//         },
//         select: {
//           quantity: true,
//           delivered: true
//         }
//       }
//     }
//   })
// }

const getMainStockInformation = async (user: TAuthUser, seasonId: string) => {
  const [allClass, allStock, challans, unloads] = await Promise.all([
    // =========================
    // ALL CLASS
    // =========================
    prisma.classAndRate.findMany({
      where: {
        isDeleted: false,
        vataId: user.vataId,
      },
      select: {
        className: true,
        rate: true,
      },
    }),

    // =========================
    // STOCK BOOK
    // =========================
    prisma.stockBook.findMany({
      where: {
        isDeleted: false,
        seasonId,
        vataId: user.vataId,
      },
      select: {
        stockIn: true,
        stockOut: true,
        class: true,
      },
    }),

    // =========================
    // CHALLAN
    // =========================
    prisma.challan.findMany({
      where: {
        seasonId,
        vataId: user.vataId,
        isDeleted: false,
      },
      select: {
        items: {
          where: {
            isDeleted: false,
          },
          select: {
            class: true,
            quantity: true,
            delivered: true,
          },
        },
      },
    }),

    // =========================
    // UNLOAD
    // =========================
    prisma.unload.findMany({
      where: {
        round: {
          vataId: user.vataId,
          seasonId,
        },
        isDeleted: false,
      },
      select: {
        items: {
          select: {
            quantity: true,
            class: {
              select: {
                className: true,
              },
            },
          },
        },
      },
    }),
  ]);

  // ==========================================
  // STOCK BOOK MAP
  // Stock In - Stock Out
  // ==========================================
  const stockMap = allStock.reduce(
    (acc, stock) => {
      const className = stock.class;

      if (!acc[className]) {
        acc[className] = {
          stockIn: 0,
          stockOut: 0,
        };
      }

      acc[className].stockIn += Number(stock.stockIn || 0);

      acc[className].stockOut += Number(stock.stockOut || 0);

      return acc;
    },
    {} as Record<
      string,
      {
        stockIn: number;
        stockOut: number;
      }
    >,
  );

  // ==========================================
  // DELIVERED MAP
  // Class অনুযায়ী কত ইট delivered হয়েছে
  // ==========================================
  const deliveredMap = challans
    .flatMap((challan) => challan.items)
    .reduce(
      (acc, item) => {
        const className = item.class;

        acc[className] = (acc[className] || 0) + Number(item.delivered || 0);

        return acc;
      },
      {} as Record<string, number>,
    );

  // ==========================================
  // DELIVERY PENDING MAP
  // Quantity - Delivered
  // ==========================================
  const deliveryPendingMap = challans
    .flatMap((challan) => challan.items)
    .reduce(
      (acc, item) => {
        const className = item.class;

        const pending =
          Number(item.quantity || 0) - Number(item.delivered || 0);

        acc[className] = (acc[className] || 0) + Math.max(pending, 0);

        return acc;
      },
      {} as Record<string, number>,
    );

  // ==========================================
  // UNLOAD MAP
  // ==========================================
  const unloadMap = unloads
    .flatMap((unload) => unload.items)
    .reduce(
      (acc, item) => {
        const className = item?.class?.className;

        if (!className) {
          return acc;
        }

        acc[className] = (acc[className] || 0) + Number(item.quantity || 0);

        return acc;
      },
      {} as Record<string, number>,
    );

  // ==========================================
  // FINAL DATA
  // ==========================================
  const data = allClass.map((classInfo) => {
    const className = classInfo.className;

    // Stock Book
    const stock = stockMap[className];

    const stockBookStock = (stock?.stockIn || 0) - (stock?.stockOut || 0);

    // Unload
    const unloadQuantity = unloadMap[className] || 0;

    // ======================================
    // DELIVERED
    // Actually delivered bricks
    // ======================================
    const delivered = deliveredMap[className] || 0;

    // ======================================
    // TOTAL STOCK
    // Stock Book + Unload
    // ======================================
    const totalStock = stockBookStock + unloadQuantity;

    // ======================================
    // DELIVERY PENDING
    // Challan Quantity - Delivered
    // ======================================
    const deliveryPending = deliveryPendingMap[className] || 0;

    // ======================================
    // MAIN / CURRENT STOCK
    // Total Stock - Delivered
    // ======================================
    const mainStock = totalStock - delivered;

    // ======================================
    // RATE
    // ======================================
    const rate = Number(classInfo.rate || 0);

    // ======================================
    // STOCK VALUE
    // ======================================
    const stockValue = mainStock * rate;

    return {
      className,
      rate,
      totalStock,
      delivered,
      deliveryPending,
      mainStock,
      stockValue,
    };
  });

  // ==========================================
  // TOTAL
  // ==========================================
  const total = data.reduce(
    (acc, item) => ({
      totalStock: acc.totalStock + item.totalStock,

      delivered: acc.delivered + item.delivered,

      deliveryPending: acc.deliveryPending + item.deliveryPending,

      mainStock: acc.mainStock + item.mainStock,

      stockValue: acc.stockValue + item.stockValue,
    }),
    {
      totalStock: 0,
      delivered: 0,
      deliveryPending: 0,
      mainStock: 0,
      stockValue: 0,
    },
  );

  return {
    data,
    total,
  };
};

export const StockBookService = {
  createStockBookService,
  getAllStockService,
  deleteStockService,
  getMainStockInformation,
};
