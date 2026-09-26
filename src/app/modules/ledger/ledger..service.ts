import { StatusCodes } from "http-status-codes";
import { Ledger, Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { TQuery } from "../../../interface/query";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { TAuthUser } from "../../../interface/token";
// GET LEDGER COUNT
const getLedgerCountService = async (user: TAuthUser) => {
  const res = await prisma.ledger.count({ where: { vataId: user?.vataId } });
  return res + 1;
};

// CREATE A LEDGER
const createLedgerService = async (
  user: TAuthUser,
  seasonId: string,
  data: Ledger,
) => {
  const isSerialExist = await prisma.ledger.findFirst({
    where: {
      serial: Number(data.serial),
      vataId: user.vataId,
      seasonId,
      isDeleted: false,
    },
  });

  if (isSerialExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই সিরিয়াল নম্বরটি ইতোমধ্যে ব্যবহার করা হয়েছে।",
    );
  }

  const isExist = await prisma.ledger.findFirst({
    where: {
      name: data.name,
      vataId: user.vataId,
      isDeleted: false,
      seasonId,
    },
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই নামে একটি লেজার বা লেজার গ্রুপ ইতোমধ্যে রয়েছে।",
    );
  }
  const result = await prisma.ledger.create({
    data: {
      ...data,
      serial: Number(data.serial),
      quantity: Number(data.quantity || 0),
      rate: Number(data.rate || 0),
      salary: Number(data.salary || 0),
      weeklyFood: Number(data.weeklyFood || 0),
      openingBalance: Number(data.openingBalance || 0),
      openingBalanceType: data.openingBalanceType || null,
      vataId: user.vataId,
      seasonId,
    },
  });

  return result;
};

// GET GROUP OPTION
const getLedgerOptionService = async (user: TAuthUser, seasonId: string) => {
  const res = await prisma.ledger.findMany({
    where: {
      parentId: null,
      isDeleted: false,
      vataId: user.vataId,
      seasonId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
};

// GET ALL LEDGER WITH CHILDREN
const getAllLedgerWithChildrenService = async (
  user: TAuthUser,
  seasonId: string,
) => {
  const res = await prisma.ledger.findMany({
    where: {
      parentId: null,
      isDeleted: false,
      vataId: user.vataId,
      seasonId,
    },
    select: {
      id: true,
      name: true,
      rate: true,
      quantity: true,
      salary: true,
      children: {
        where: {
          isDeleted: false,
        },
        select: {
          name: true,
          id: true,
          rate: true,
          quantity: true,
          salary: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return res;
};

// GET ALL LEDGERS WITH PAGINATION
const getAllLedgerWithChildrenPaginationService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.LedgerWhereInput = {
    vataId: user.vataId,
    isDeleted: false,
    seasonId,
    // parentId: null,
  };
  if (query.search?.trim()) {
    const search = query.search.trim();

    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        phoneNumber: {
          contains: search,
          mode: "insensitive",
        },
      },
      ...(Number.isNaN(Number(search))
        ? []
        : [
            {
              serial: Number(search),
            },
          ]),
    ];
  }

  const [result, total] = await Promise.all([
    prisma.ledger.findMany({
      where,
      select: {
        id: true,
        name: true,
        parentId: true,
        rate: true,
        phoneNumber: true,
        startDate: true,
        quantity: true,
        serial: true,
        salary: true,
        weeklyFood: true,
        openingBalance: true,
        openingBalanceType: true,
        parent: {
          select: {
            name: true,
            phoneNumber: true,
            startDate: true,
          },
        },
        children: {
          select: {
            name: true,
            id: true,
            rate: true,
            quantity: true,
            serial: true,
            phoneNumber: true,
            startDate: true,
            salary: true,
            weeklyFood: true,
            openingBalance: true,
            openingBalanceType: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: {
        parentId: "asc",
      },
    }),
    prisma.ledger.count({ where }),
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

// GET ALL LEDGER WITH TK
const getAllLedgerWithAmountService = async (
  user: TAuthUser,
  seasonId: string,
) => {
  const result = await prisma.ledger.findMany({
    where: {
      isDeleted: false,
      seasonId,
      vataId: user.vataId,
    },
    include: {
      payments: {
        where: {
          isDeleted: false,
          vataId: user.vataId,
        },
        select: {
          payment: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // প্রতিটি ledger-এর নিজের payment total
  const ledgerMap = new Map<string, any>();

  result.forEach((ledger) => {
    const ownTotal = ledger.payments.reduce(
      (sum, payment) => sum + Number(payment.payment || 0),
      0,
    );

    ledgerMap.set(ledger.id, {
      id: ledger.id,
      name: ledger.name,
      parentId: ledger.parentId,
      total: ownTotal,
      children: [],
    });
  });

  // Parent -> Children
  result.forEach((ledger) => {
    if (ledger.parentId !== null) {
      const parent = ledgerMap.get(ledger.parentId);
      const child = ledgerMap.get(ledger.id);

      if (parent && child && child.total > 0) {
        parent.children.push({
          id: child.id,
          name: child.name,
          total: child.total,
        });
      }
    }
  });

  // Final response
  const finalResult = [];

  for (const ledger of result) {
    if (ledger.parentId !== null) continue;

    const parent = ledgerMap.get(ledger.id);

    const childrenTotal = parent.children.reduce(
      (sum: number, child: any) => sum + child.total,
      0,
    );

    const total = parent.total + childrenTotal;

    // Parent এবং তার children—সবগুলোর total 0 হলে বাদ
    if (total <= 0) continue;

    if (parent.children.length > 0) {
      finalResult.push({
        id: parent.id,
        name: parent.name,
        total,
        children: parent.children,
      });
    } else {
      finalResult.push({
        id: parent.id,
        name: parent.name,
        total,
      });
    }
  }

  return finalResult;
};

// GET DETAILS

const getDetailsLedgerService = async (
  user: TAuthUser,
  seasonId: string,
  id: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.PaymentWhereInput = {
    vataId: user.vataId,
    isDeleted: false,
  };
  // Create start and end of day boundaries
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      where.paymentDate = dateRange;
    }
  }
  const ledger = await prisma.ledger.findUnique({
    where: { id, vataId: user.vataId, seasonId, isDeleted: false },
    select: {
      name: true,
      id: true,
      parentId: true,
      phoneNumber: true,
      rate: true,
      quantity: true,
      salary: true,
      season: {
        select: { name: true },
      },
      serial: true,
      startDate: true,
      openingBalance: true,
      openingBalanceType: true,
      weeklyFood: true,
      _count: { select: { payments: true } },
    },
  });

  if (ledger?.name) {
    where.ledger = {
      name: ledger.name,
    };
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, "খতিয়ানের তথ্য পাওয়া যায়নি");
  }

  const [payment, total, allPayments] = await Promise.all([
    prisma.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.count({ where }),
    prisma.payment.findMany({
      where,
      select: {
        paymentType: true,
        payment: true,
        paymentDifference: true,
        totalBill: true,
        cutting: true,
        quantity: true,
      },
    }),
  ]);

  const summary = allPayments.reduce(
    (acc, row) => {
      const payment = Number(row.payment || 0);
      const totalBill = Number(row.totalBill || 0);
      const cutting = Number(row.cutting || 0);
      const quantity = Number(row.quantity || 0);
      if (row.paymentType === "অগ্রিম পেমেন্ট") {
        acc.totalAdvance += payment;

        const difference = Number(row.paymentDifference || 0);

        acc.totalAdvanceDue += Math.max(difference, 0);
      }

      if (row.paymentType === "বাকি পেমেন্ট") {
        acc.totalLoanPayment += payment;

        const difference = Number(row.paymentDifference || 0);

        acc.totalLoanPayment += Math.max(difference, 0);
      }

      if (row.paymentType !== "অগ্রিম পেমেন্ট") {
        acc.totalPayment += payment;
      }

      const due = totalBill - cutting - payment;
      acc.totalDue += Math.max(due, 0);
      acc.totalQuantity += quantity;
      acc.totalBill += totalBill;
      acc.totalPaymentAmount += payment;
      acc.totalCutting += cutting;

      return acc;
    },
    {
      totalAdvance: 0,
      totalPayment: 0,
      totalAdvanceDue: 0,
      totalDue: 0,
      totalQuantity: 0,
      totalBill: 0,
      totalPaymentAmount: 0,
      totalCutting: 0,
      totalLoanPayment: 0,
    },
  );

  const format = {
    ledger,
    id: ledger?.id,
    data: payment,
    summary,
  };

  const meta = createMetaConfig({
    limit: limit,
    page: page,
    totalData: total,
  });

  return {
    meta,
    data: format,
  };
};

// const GET SINGLE
const getSingleLedgerService = async (user: TAuthUser, id: string) => {
  const result = await prisma.ledger.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
    select: {
      serial: true,
      name: true,
      parentId: true,
      rate: true,
      quantity: true,
      phoneNumber: true,
      startDate: true,
      salary: true,
      weeklyFood: true,
      openingBalance: true,
      openingBalanceType: true,
    },
  });

  return result;
};

/// UPDATE KHOTIYAN
const updateLedgerService = async (
  user: TAuthUser,
  id: string,
  data: Ledger,
) => {
  const isExist = await prisma.ledger.findUnique({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!isExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "এই খতিয়ানটি পাওয়া যায়নি।");
  }
  const result = await prisma.ledger.update({
    where: {
      id,
      vataId: user.vataId,
    },
    data: {
      ...data,
      serial: Number(data.serial),
      quantity: Number(data.quantity || 0),
      rate: Number(data.rate || 0),
      salary: Number(data.salary || 0),
      weeklyFood: Number(data.weeklyFood || 0),
      openingBalance: Number(data.openingBalance || 0),
      parentId: data.parentId || null,
      openingBalanceType: data.openingBalanceType || null,
    },
  });

  return result;
};

// DELETE KHOTIYAN
const deleteLedgerService = async (user: TAuthUser, id: string) => {
  const isExist = await prisma.ledger.findUnique({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!isExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "এই খতিয়ানটি পাওয়া যায়নি।");
  }

  const result = await prisma.ledger.update({
    where: {
      id,
      vataId: user.vataId,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const LedgerService = {
  getLedgerCountService,
  createLedgerService,
  getLedgerOptionService,
  getAllLedgerWithChildrenService,
  getAllLedgerWithAmountService,
  getDetailsLedgerService,
  getAllLedgerWithChildrenPaginationService,
  getSingleLedgerService,
  updateLedgerService,
  deleteLedgerService,
};
