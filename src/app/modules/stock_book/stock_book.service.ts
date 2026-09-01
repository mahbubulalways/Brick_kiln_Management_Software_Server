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

export const StockBookService = {
  createStockBookService,
  getAllStockService,
  deleteStockService
};