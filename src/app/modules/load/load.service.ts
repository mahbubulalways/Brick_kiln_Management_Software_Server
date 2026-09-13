import { StatusCodes } from "http-status-codes";
import { LoadType, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { AppError } from "../../errors/ApplicationError";
import { TLoadInfo } from "./load.interface";
import { checkAvailableBrick, updateBrickStock } from "./load.utils";
import { LoadInfoWhereInput } from "../../../generated/prisma/models";

// CREATE LOAD INFO
const createLoadInfoService = async (
  user: TAuthUser,
  seasonId: string,
  payload: TLoadInfo,
) => {
  const round = payload.round;
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // ROUND OPERATIONS
      let roundExist = await tx.round.findFirst({
        where: {
          name: round,
          vataId: user.vataId,
          seasonId,
        },
      });
      if (!roundExist) {
        roundExist = await tx.round.create({
          data: {
            name: round,
            vataId: user.vataId,
            seasonId,
          },
        });
      }

      // QUANTITY
      const quantity = Number(payload.quantity || 0);

      // CHECK AVAILABILITY
      await checkAvailableBrick(tx, user.vataId, payload.loadType, quantity);

      // BRICK STOCK SUMMARUY
      let brickSummary = await tx.brickStockSummary.findFirst({
        where: {
          vataId: user.vataId,
        },
      });
      if (!brickSummary) {
        brickSummary = await tx.brickStockSummary.create({
          data: {
            vataId: user.vataId,
            rawBrick: 0,
            fieldBrick: 0,
            stockBrick: 0,
            chulliBrick: 0,
          },
        });
      }

      // LOAD CREATE
      const load = await tx.loadInfo.create({
        data: {
          date: payload.date,
          loadType: payload.loadType,
          roundId: roundExist.id,
          quantity,
          classId: payload.classId || null,
        },
      });

      // UPDATE BRICK STOCK SUMMARY
      if (payload.loadType === LoadType.RAWENTRY) {
        await tx.brickStockSummary.update({
          where: {
            id: brickSummary.id,
          },
          data: {
            rawBrick: {
              increment: quantity,
            },
          },
        });
      } else if (payload.loadType === LoadType.RAW_TO_FIELD) {
        await tx.brickStockSummary.update({
          where: {
            vataId: user.vataId,
          },
          data: {
            rawBrick: { decrement: quantity },
            fieldBrick: { increment: quantity },
          },
        });
      } else if (payload.loadType === LoadType.FIELD_TO_CHULLI) {
        await tx.brickStockSummary.update({
          where: {
            vataId: user.vataId,
          },
          data: {
            fieldBrick: { decrement: quantity },
            chulliBrick: { increment: quantity },
          },
        });
      } else if (payload.loadType === LoadType.STOCK_TO_CHULLI) {
        await tx.brickStockSummary.update({
          where: {
            vataId: user.vataId,
          },
          data: {
            stockBrick: { decrement: quantity },
            chulliBrick: { increment: quantity },
          },
        });
      } else if (payload.loadType === LoadType.FIELD_TO_STOCK) {
        await tx.brickStockSummary.update({
          where: {
            vataId: user.vataId,
          },
          data: {
            fieldBrick: { decrement: quantity },
            stockBrick: { increment: quantity },
          },
        });
      }

      return load;
    },
  );

  return result;
};

// GET ALL LOAD INFO
const getAllLoadInfoService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const where: Prisma.LoadInfoWhereInput = {
    isDeleted: false,
    round: { vataId: user.vataId, seasonId },
  };

  // DATE FILTER
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.date = dateRange;
    }
  }

  // SEARCH
  if (query.search?.trim()) {
    const search = query.search.trim();
    where.OR = [
      {
        round: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  const [result, total] = await Promise.all([
    prisma.loadInfo.findMany({
      where,
      skip,
      take: limit,

      include: {
        round: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.loadInfo.count({
      where,
    }),
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

// GET SINGLE LOAD INFO
const getSingleLoadInfoService = async (user: TAuthUser, id: string) => {
  return await prisma.loadInfo.findFirst({
    where: {
      id,
      isDeleted: false,
      round: {
        vataId: user.vataId,
      },
    },

    include: {
      round: true,
    },
  });
};

// UPDATE LOAD INFO
const updateLoadInfoService = async (
  user: TAuthUser,
  seasonId: string,
  id: string,
  payload: TLoadInfo,
) => {
  return await prisma.$transaction(async (tx) => {
    // --------------------------------
    // GET OLD LOAD
    // --------------------------------

    const oldLoad = await tx.loadInfo.findUnique({
      where: {
        id,
      },
    });

    if (!oldLoad) {
      throw new AppError(StatusCodes.NOT_FOUND, "লোডের তথ্য পাওয়া যায়নি।");
    }

    // --------------------------------
    // ROUND
    // --------------------------------

    let round = await tx.round.findFirst({
      where: {
        name: payload.round,
        vataId: user.vataId,
        seasonId,
      },
    });

    if (!round) {
      round = await tx.round.create({
        data: {
          name: payload.round,
          vataId: user.vataId,
          seasonId,
        },
      });
    }

    // --------------------------------
    // BRICK STOCK SUMMARY
    // --------------------------------

    const brickSummary = await tx.brickStockSummary.findFirst({
      where: {
        vataId: user.vataId,
      },
    });

    if (!brickSummary) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "ইটের স্টক তথ্য পাওয়া যায়নি।",
      );
    }

    const oldQuantity = Number(oldLoad.quantity);
    const newQuantity = Number(payload.quantity || 0);

    // --------------------------------
    // 1. REVERSE OLD LOAD
    // --------------------------------

    await updateBrickStock(
      tx,
      brickSummary.id,
      oldLoad.loadType,
      oldQuantity,
      true,
    );

    // --------------------------------
    // 2. CHECK NEW LOAD AVAILABILITY
    // --------------------------------

    await checkAvailableBrick(tx, user.vataId, payload.loadType, newQuantity);

    // --------------------------------
    // 3. APPLY NEW LOAD
    // --------------------------------

    await updateBrickStock(tx, brickSummary.id, payload.loadType, newQuantity);

    // --------------------------------
    // 4. UPDATE LOAD INFO
    // --------------------------------

    const load = await tx.loadInfo.update({
      where: {
        id,
      },
      data: {
        date: payload.date,
        loadType: payload.loadType,
        roundId: round.id,
        quantity: newQuantity,
        classId: payload.classId || null,
      },
    });

    return load;
  });
};
// DELETE LOAD INFO
const deleteLoadInfoService = async (user: TAuthUser, id: string) => {
  return await prisma.loadInfo.update({
    data: {
      isDeleted: true,
    },

    where: {
      id,
      round: {
        vataId: user.vataId,
      },
    },
  });
};

// LOAD REPORT
const getLoadReportService = async (user: TAuthUser, query: TQuery) => {
  const where: LoadInfoWhereInput = { round: { vataId: user.vataId } };
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.date = dateRange;
    }
  }
  const result = await prisma.loadInfo.findMany({
    where,
    select: {
      loadType: true,
      quantity: true,
    },
  });
  return result;
};

export const LoadInfoService = {
  createLoadInfoService,
  getAllLoadInfoService,
  getSingleLoadInfoService,
  updateLoadInfoService,
  deleteLoadInfoService,
  getLoadReportService,
};
