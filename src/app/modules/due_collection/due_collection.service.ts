import { StatusCodes } from "http-status-codes";
import { Due_Collection, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { AppError } from "../../errors/ApplicationError";
import { TAuthUser } from "../../../interface/token";
import { TDueCollectionData } from "./due_collection.interface";

const getDueOfCustomerService = async (user: TAuthUser, customerCode: string) => {
  const result = await prisma.customer.findFirst({
    where: { customerCode: customerCode, vataId: user.vataId },
  });
  return result;
};

// INSERT DUE
const collectDueService = async (user: TAuthUser, payload: TDueCollectionData) => {
  const findCustomerId = await prisma.customer.findFirst({
    where: {
      customerCode: payload.customerCode, vataId: user.vataId,
    }, select: { id: true }
  })

  const data = {
    customerId: findCustomerId?.id!,
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
const todayPayDueService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CustomerWhereInput = {
    vataId: user.vataId,
    isDeleted: false,
  };

  if (query.search?.trim()) {
    const search = query.search.trim();


    where.OR = [
      {
        customerCode: {
          contains: search,
          mode: "insensitive",
        }
      },

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

const getTodaysDuePaidService = async (user: TAuthUser, query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);

  const where: Prisma.Due_CollectionWhereInput = {
    isDeleted: false,
    customer: {
      vataId: user.vataId
    }
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
const getAllDueListService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CustomerWhereInput = {
    isDeleted: false,
    vataId: user.vataId
  };

  if (query.search?.trim()) {
    const search = query.search.trim();
    where.OR = [
      {
        customerCode: {
          contains: search,
          mode: "insensitive",
        }
      },

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
const getSingleDueCollectionService = async (user: TAuthUser, id: string) => {
  const result = await prisma.due_Collection.findFirst({
    where: { id, isDeleted: false, customer: { vataId: user.vataId } },
    include: { customer: true },
  });
  return result;
};

const updateDueCollectionService = async (
  user: TAuthUser,
  id: string,
  payload: TDueCollectionData,
) => {
  const findCustomerId = await prisma.customer.findFirst({
    where: {
      customerCode: payload.customerCode, vataId: user.vataId,
    }, select: { id: true }
  })

  const data = {
    customerId: findCustomerId?.id,
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


const getSingleDueCollectionDateService = async (user: TAuthUser, id: string) => {
  return await prisma.customer.findFirst({
    where:
      { id, vataId: user.vataId }, select: { nextPaymentDate: true, id: true }
  })
}


// UPDATE DUE COLLECTION DATE 
const upDateDueCollectionDateService = async (user: TAuthUser, id: string, info: { date: string, note: string }) => {
  const due = await prisma.customer.findFirst({ where: { id: id, vataId: user.vataId } })
  if (!due) {
    throw new AppError(StatusCodes.NOT_FOUND, "বাকি পাওয়া যায়নি।")
  }
  const result = await prisma.customer.update({
    data: { nextPaymentDate: info.date, note: info.note, },
    where: { id: id, vataId: user.vataId }
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
