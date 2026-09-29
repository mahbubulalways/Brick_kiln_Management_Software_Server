import { StatusCodes } from "http-status-codes";
import { Cash, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { AppError } from "../../errors/ApplicationError";
import { ActivityService } from "../activity/activity.service";

// CREATE CASH
const createCashService = async (
  user: TAuthUser,
  seasonId: string,
  payload: Cash,
) => {
  const result = prisma.cash.create({
    data: {
      ...payload,
      vataId: user.vataId,
      seasonId,
    },
  });
  return result;
};

// GET ALL CASH
const getAllCashService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CashWhereInput = {
    isDeleted: false,
    vataId: user.vataId,
    seasonId,
  };
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.createdAt = dateRange;
    }
  }
  if (query.search?.trim()) {
    const search = query.search.trim();
    // const isNumber = !isNaN(Number(search));
    where.OR = [
      {
        source: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  const [result, total] = await Promise.all([
    prisma.cash.findMany({ where, skip, take: limit }),
    prisma.cash.count({ where }),
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

const getCashReportService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const where: Prisma.CashWhereInput = {
    isDeleted: false,
    vataId: user.vataId,
    seasonId,
  };
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.createdAt = dateRange;
    }
  }
  const result = await prisma.cash.findMany({
    where,
    select: {
      amount: true,
      type: true,
      id: true,
      source: true,
    },
  });
  return result;
};

// GET SINGLE CASH
const getSingleCashService = async (user: TAuthUser, id: string) => {
  return await prisma.cash.findFirst({ where: { id, vataId: user.vataId } });
};

// UPDATE CASH
const updateCashService = async (
  user: TAuthUser,
  id: string,
  payload: Cash,
) => {
  const cash = await prisma.cash.findUnique({
    where: {
      id,
      vataId: user.vataId,
    },
    select: {
      amount: true,
      source: true,
      type: true,
      description: true,
    },
  });

  if (!cash) {
    throw new AppError(StatusCodes.NOT_FOUND, "এই ক্যাশটি পাওয়া যায়নি।");
  }
  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.cash.update({
      data: {
        ...payload,
        updateStatus: "APPROVED",
      },
      where: { id, vataId: user.vataId },
    });
    await ActivityService.createActivityService({
      action: "UPDATE",
      module: "CASH",
      targetId: id,
      userId: user.userId,
      vataId: user.vataId,
      newData: payload,
      oldData: cash,
    });
    return {
      result,
      message: "ক্যাশের তথ্য সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.cash.update({
      data: {
        updateStatus: "PENDING",
      },
      where: {
        vataId: user.vataId,
        id,
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "UPDATE",
        module: "CASH",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        newData: payload,
        oldData: cash,
      },
    });
  });

  return {
    result,
    message: "খতিয়ান আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

// DELETE CASH
const deleteCashService = async (user: TAuthUser, id: string) => {
  const cash = await prisma.cash.findUnique({
    where: {
      id,
      vataId: user.vataId,
    },
    select: {
      amount: true,
      source: true,
      type: true,
      description: true,
    },
  });
  if (!cash) {
    throw new AppError(StatusCodes.NOT_FOUND, "এই ক্যাশটি পাওয়া যায়নি।");
  }

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.cash.update({
      data: { isDeleted: true, deleteStatus: "APPROVED" },
      where: { id, vataId: user.vataId },
    });
    const cashType = cash?.type == "INCOME" ? "ক্যাশ ইন" : "ক্যাশ আউট";
    await ActivityService.createActivityService({
      action: "DELETE",
      module: "CASH",
      targetId: id,
      userId: user.userId,
      vataId: user.vataId,
      referenceNumber: `${cash?.source} এর ${cash.amount} টাকা ${cashType}`,
    });

    return {
      result,
      message: "ক্যাশটি সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  // HERE REQUEST CREATE FOR DELETE
  const result = await prisma.$transaction(async (tx) => {
    await tx.cash.update({
      data: {
        deleteStatus: "PENDING",
      },
      where: {
        vataId: user.vataId,
        id,
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "DELETE",
        module: "CASH",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        oldData: cash,
      },
    });
  });

  return {
    result,
    message: "ক্যাশটি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

export const CashService = {
  createCashService,
  getAllCashService,
  getSingleCashService,
  updateCashService,
  deleteCashService,
  getCashReportService,
};
