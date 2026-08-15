import { StatusCodes } from "http-status-codes";
import { Due_Collection, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { AppError } from "../../errors/ApplicationError";

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
const todayPayDueService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CustomerWhereInput = {
    isDeleted: false,
  };

  if (query.search?.trim()) {
    const search = query.search.trim();
    const isNumber = !isNaN(Number(search));

    where.OR = [
      ...(isNumber
        ? [
          {
            id: Number(search),
          },
        ]
        : []),

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
    ];
  }

  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.nextPaymentDate = dateRange;
    }
  }
  const [result, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: {
        challans: {
          select: {
            note: true,
            items: { select: { quantity: true, delivered: true } },
          },
        },
      },
      orderBy: { nextPaymentDate: "asc" },
      skip, take: limit
    }),
    prisma.customer.count({ where })
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

const getTodaysDuePaidService = async (query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);

  const where: Prisma.Due_CollectionWhereInput = {
    isDeleted: false,
  };

  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);

    if (dateRange) {
      where.createdAt = dateRange;
    }
  }

  const [result, total] = await Promise.all([
    prisma.due_Collection.findMany({
      where,
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.due_Collection.count({
      where,
    }),
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
const getAllDueListService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CustomerWhereInput = {
    isDeleted: false,
  };

  if (query.search?.trim()) {
    const search = query.search.trim();
    const isNumber = !isNaN(Number(search));
    where.OR = [
      ...(isNumber
        ? [
          {
            id: Number(search),
          },
        ]
        : []),

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
    ];
  }

  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.nextPaymentDate = dateRange;
    }
  }

  const [result, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      include: {
        challans: {
          include: { items: true }
        }
      },
      skip, take: limit
    }),

    prisma.customer.findMany({
      where,
      include: {
        challans: {
          include: { items: true }
        }
      },
    }),

  ]);

  const customersWithRemaining = result.map((customer) => {
    const { challans, ...customerData } = customer;
    let totalQuantity = 0;
    let totalDelivered = 0;
    challans.forEach((challan) => {
      challan.items.forEach((item) => {
        totalQuantity += item.quantity ?? 0;
        totalDelivered += item.delivered ?? 0;
      });
    });

    return {
      ...customerData,
      remainingDelivery: totalQuantity - totalDelivered,
    };
  });

  const totalLength = total.map((customer) => {
    const { challans, ...customerData } = customer;
    let totalQuantity = 0;
    let totalDelivered = 0;
    challans.forEach((challan) => {
      challan.items.forEach((item) => {
        totalQuantity += item.quantity ?? 0;
        totalDelivered += item.delivered ?? 0;
      });
    });

    return {
      ...customerData,
      remainingDelivery: totalQuantity - totalDelivered,
    };
  }).length;

  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: totalLength,
  });

  return {
    meta,
    data: customersWithRemaining,
  };

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
      await tx.customer.update({
        where: { id: data.customerId },
        data: { nextPaymentDate: payload.nextDate }
      })

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


const getSingleDueCollectionDateService = async (id: number) => {
  return await prisma.customer.findFirst({ where: { id }, select: { nextPaymentDate: true, id: true } })
}


// UPDATE DUE COLLECTION DATE 
const upDateDueCollectionDateService = async (id: string, info: { date: string, note: string }) => {
  const due = await prisma.customer.findFirst({ where: { id: Number(id) } })
  if (!due) {
    throw new AppError(StatusCodes.NOT_FOUND, "বাকি পাওয়া যায়নি।")
  }
  const result = await prisma.customer.update({
    data: { nextPaymentDate: info.date, note: info.note, },
    where: { id: Number(id) }
  })
  return result
}

export const DueCollectionService = {
  getDueOfCustomerService,
  collectDueService,
  todayPayDueService,
  getTodaysDuePaidService,
  getAllDueListService,
  getSingleDueCollectionService,
  updateDueCollectionService,
  upDateDueCollectionDateService,
  getSingleDueCollectionDateService
};
