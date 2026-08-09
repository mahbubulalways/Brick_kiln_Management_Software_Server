import { Due_Collection, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";

const getDueOfCustomerService = async (customerId: number) => {
  const result = await prisma.customer.findFirst({
    where: { id: customerId },
  });
  return result;
};

// INSERT DUE

const collectDueService = async (payload: Due_Collection) => {
  const data = {
    customerId: Number(payload.customerId),
    due: Number(payload.due),
    collect: Number(payload.collect),
    newDue: Number(payload.newDue),
    season: payload.season,
    nextDate: payload.nextDate,
  };

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const result = await tx.due_Collection.create({
        data: data,
      });
      await tx.customer.update({
        data: {
          totalPaid: { increment: data?.collect },
          nextPaymentDate: data.nextDate,
        },
        where: {
          id: data.customerId,
        },
      });
      return result;
    },
  );
  return result;
};

// TODAY HAVE PAY
const todayPayDueService = async (date: string) => {
  const parsedDate = new Date(date);
  const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

  const result = await prisma.customer.findMany({
    where: {
      nextPaymentDate: { gte: startOfDay, lte: endOfDay },
      isDeleted: false,
    },
    include: {
      challans: {
        select: {
          note: true,
          items: { select: { quantity: true, delivered: true } },
        },
      },
    },
  });
  return result;
};

// GET TODAYS DUE PAYMENT
const getTodaysDuePaidService = async (query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);
  const where: Prisma.Due_CollectionWhereInput = { isDeleted: false };
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.createdAt = dateRange;
    }
  }
  const [result, total] = await prisma.$transaction([
    prisma.due_Collection.findMany({
      where,
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit
    }),
    prisma.due_Collection.count({ where })

  ]);
  const meta = createMetaConfig({
    limit: pagination.limit,
    page: pagination.page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

// GET ALL DUE
const getAllDueListService = async (startDate, endDate) => {
  const dateFilter =
    startDate && endDate
      ? {
        nextPaymentDate: {
          gte: startDate,
          lte: endDate,
        },
        isDeleted: false,
      }
      : { isDeleted: false };

  const result = await prisma.customer.findMany({
    where: dateFilter,
    include: {
      challans: {
        select: {
          items: {
            select: {
              delivered: true,
              quantity: true,
            },
          },
        },
      },
    },
  });
  const filtered = result.filter((c) => c.totalPaid !== c.totalPurchased);
  return filtered;
};

// GET SINGLE
const getSingleDueCollectionService = async (id: number) => {
  const result = await prisma.due_Collection.findFirst({
    where: { id, isDeleted: false },
    include: { customer: true },
  });
  return result;
};

const updateDueCollectionService = async (
  id: number,
  payload: Due_Collection,
) => {
  const data = {
    customerId: Number(payload.customerId),
    due: Number(payload.due),
    collect: Number(payload.collect),
    newDue: Number(payload.newDue),
    season: payload.season,
    nextDate: payload.nextDate,
  };

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const getDueFirst = await tx.due_Collection.findFirst({
        where: { id },
        select: { collect: true },
      });
      const dueCalculate = payload.collect - (getDueFirst?.collect as number);
      const update = await tx.due_Collection.update({
        data: data,
        where: { id },
      });

      // NEED TO UPDATE CUSTOMER DUE
      await tx.customer.update({
        data: {
          totalPaid: { increment: dueCalculate },
        },
        where: {
          id: data.customerId,
        },
      });
      return update;
    },
  );
  return result;
};

export const DueCollectionService = {
  getDueOfCustomerService,
  collectDueService,
  todayPayDueService,
  getTodaysDuePaidService,
  getAllDueListService,
  getSingleDueCollectionService,
  updateDueCollectionService,
};
