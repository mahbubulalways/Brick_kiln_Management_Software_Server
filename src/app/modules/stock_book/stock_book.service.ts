import { Prisma, StockBook } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";

// CREATE STOCK BOOK SERVICE
const createStockBookService = async (user: TAuthUser, seasonId: string, payload: StockBook) => {
  payload.createdById = user.userId
  payload.seasonId = seasonId
  payload.vataId = user.vataId
  const result = await prisma.stockBook.create({ data: payload })
  return result
}

// GET ALL STOCK
const getAllStockService = async (user: TAuthUser, seasonId: string, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const [result, total] = await Promise.all([
    prisma.stockBook.findMany(
      {
        where: { isDeleted: false, seasonId, vataId: user.vataId },
        include: {
          createdBy: {
            select: {
              name: true,
            }
          }
        },
        take: limit,
        skip
      }),
    prisma.stockBook.count({ where: { isDeleted: false, seasonId, vataId: user.vataId } })
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

// DELETE
const deleteStockService = async (id: string) => {
  return await prisma.stockBook.delete({ where: { id } })
}

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



const getMainStockInformation = async (
  user: TAuthUser,
  seasonId: string
) => {
  const [allClass, allStock, challans] = await Promise.all([
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
  ]);

  // Stock class-wise
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
    >
  );

  // Challan items flatten করে class-wise pending বের করা
  const deliveryMap = challans
    .flatMap((challan) => challan.items)
    .reduce(
      (acc, item) => {
        const className = item.class;

        const pending =
          Number(item.quantity || 0) -
          Number(item.delivered || 0);

        acc[className] =
          (acc[className] || 0) + Math.max(pending, 0);

        return acc;
      },
      {} as Record<string, number>
    );

  // Final class-wise data
  const data = allClass.map((classInfo) => {
    const className = classInfo.className;

    const stock = stockMap[className];

    const totalStock =
      (stock?.stockIn || 0) -
      (stock?.stockOut || 0);

    const deliveryPending =
      deliveryMap[className] || 0;

    const mainStock =
      totalStock - deliveryPending;

    const rate = Number(classInfo.rate || 0);

    const stockValue =
      mainStock * rate;

    return {
      className,
      rate,
      totalStock,
      deliveryPending,
      mainStock,
      stockValue,
    };
  });

  // Grand total
  const total = data.reduce(
    (acc, item) => ({
      totalStock:
        acc.totalStock + item.totalStock,

      deliveryPending:
        acc.deliveryPending +
        item.deliveryPending,

      mainStock:
        acc.mainStock + item.mainStock,

      stockValue:
        acc.stockValue + item.stockValue,
    }),
    {
      totalStock: 0,
      deliveryPending: 0,
      mainStock: 0,
      stockValue: 0,
    }
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
  getMainStockInformation
};