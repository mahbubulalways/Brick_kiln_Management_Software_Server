import {
  CashWhereInput,
  ChallanWhereInput,
  DeliveryWhereInput,
  Due_CollectionWhereInput,
  PaymentWhereInput,
} from "../../../generated/prisma/models";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { ReportUtils } from "./report.utils";

const getTopSellingAreasService = async (user: TAuthUser) => {
  const challans = await prisma.challan.findMany({
    where: {
      isDeleted: false,
      customer: {
        vataId: user.vataId,
        isDeleted: false,
      },
    },
    select: {
      id: true,
      totalPrice: true,
      customerId: true,
      customer: {
        select: {
          address: true,
        },
      },
      items: {
        where: {
          isDeleted: false,
        },
        select: {
          quantity: true,
        },
      },
    },
  });

  const areaMap = new Map<
    string,
    {
      customerIds: Set<string>;
      totalChallan: number;
      totalQuantity: number;
      totalSales: number;
    }
  >();

  for (const challan of challans) {
    const area = challan.customer.address.trim();

    const totalQuantity = challan.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    const existingArea = areaMap.get(area);

    if (existingArea) {
      // Unique customer
      existingArea.customerIds.add(challan.customerId);

      // Challan count
      existingArea.totalChallan += 1;

      // Total bricks
      existingArea.totalQuantity += totalQuantity;

      // Total sales
      existingArea.totalSales += challan.totalPrice;
    } else {
      areaMap.set(area, {
        customerIds: new Set([challan.customerId]),
        totalChallan: 1,
        totalQuantity,
        totalSales: challan.totalPrice,
      });
    }
  }

  const result = Array.from(areaMap.entries())
    .map(([area, data]) => ({
      area,

      totalCustomer: data.customerIds.size,

      totalChallan: data.totalChallan,

      totalQuantity: data.totalQuantity,

      totalSales: data.totalSales,
    }))
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 15)
    .map((item, index) => ({
      rank: index + 1,
      ...item,
    }));

  return result;
};

// GET ALL REPORT FOR DASHBOARD
const dashboardAllReportService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const challanWhere: ChallanWhereInput = {
    isDeleted: false,
    vataId: user.vataId,
    seasonId,
  };

  const paymentWhere: PaymentWhereInput = {
    isDeleted: false,
    ledger: { seasonId, vataId: user.vataId },
  };

  const deuWhere: Due_CollectionWhereInput = {
    seasonId,
    customer: {
      vataId: user.vataId,
    },
  };

  const cashExpenseWhere: CashWhereInput = {
    vataId: user.vataId,
    seasonId,
    type: "EXPENSE",
  };
  const cashIncomeWhere: CashWhereInput = {
    vataId: user.vataId,
    seasonId,
    type: "INCOME",
  };

  const deliveryWhere: DeliveryWhereInput = {
    invoice: {
      seasonId,
      vataId: user.vataId,
    },
  };
  console.log(query.date);
  if (query.date) {
    const dateRange = getDateRangeDbSearch(query.date);
    if (dateRange) {
      challanWhere.challanDate = dateRange;
      paymentWhere.paymentDate = dateRange;
      deuWhere.createdAt = dateRange;
      cashExpenseWhere.createdAt = dateRange;
      cashIncomeWhere.createdAt = dateRange;
      deliveryWhere.deliveryDate = dateRange;
    }
  }

  const challans = await prisma.challan.findMany({
    where: challanWhere,
    select: {
      carRent: true,
      cash: true,
      discount: true,
      due: true,
      items: {
        select: {
          class: true,
          quantity: true,
          price: true,
        },
      },
    },
  });

  const challanReport = ReportUtils.calculateDashboardReport(challans);
  // ITEMS
  const items = ReportUtils.calculateClassWiseReport(challans);

  // PAYMENTS
  const payments = await prisma.payment.findMany({
    where: paymentWhere,
    select: {
      payment: true,
      totalBill: true,
      cutting: true,
      ledger: {
        select: { name: true },
      },
    },
  });

  const paymentReport = ReportUtils.calculatePaymentReport(payments);
  const totalPaymentGiven = paymentReport.reduce(
    (sum, item) => sum + item.paymentGiven,
    0,
  );

  // DUE=====================================================================
  const due = await prisma.due_Collection.aggregate({
    where: deuWhere,
    _sum: {
      collect: true,
    },
  });

  // CASH==================================================

  const cashExpense = await prisma.cash.aggregate({
    where: cashExpenseWhere,
    _sum: {
      amount: true,
    },
  });
  const cashIncome = await prisma.cash.aggregate({
    where: cashIncomeWhere,
    _sum: {
      amount: true,
    },
  });

  const totalCash =
    Number(cashIncome._sum.amount) - Number(cashExpense._sum.amount);

  const delivery = await prisma.delivery.findMany({
    where: deliveryWhere,
    select: {
      deliveryReceived: true,
      class: true,
    },
  });

  //   DELIVERY
  const classWiseDelivery = Object.values(
    delivery.reduce(
      (acc, item) => {
        const className = item.class;

        if (!acc[className]) {
          acc[className] = {
            class: className,
            quantity: 0,
          };
        }

        acc[className].quantity += item.deliveryReceived;

        return acc;
      },
      {} as Record<
        string,
        {
          class: string;
          quantity: number;
        }
      >,
    ),
  );

  //   STOCK
  const resultSummary = await prisma.brickStockSummary.findFirst({
    where: { vataId: user.vataId }, //need to add season id
  });

  // CLASS
  const classes = await prisma.classAndRate.findMany({
    where: {
      vataId: user.vataId,
    },
    select: {
      className: true,
    },
  });

  //   GRAPH
  const allClassGraph = classes.map((item) => {
    const totalQuantity = items
      .filter((it) => it.class === item.className)
      .reduce((total, it) => total + it.totalQuantity, 0);

    return {
      class: item.className,
      quantity: totalQuantity,
    };
  });

  const allClassDeliveryGraph = classes.map((item) => {
    const totalQuantity = delivery
      .filter((it) => it.class === item.className)
      .reduce((total, it) => total + it.deliveryReceived, 0);

    return {
      class: item.className,
      quantity: totalQuantity,
    };
  });

  const Informations = {
    challan: {
      summary: challanReport,
      items,
    },
    payment: {
      total: totalPaymentGiven,
      payments: paymentReport,
    },

    due: due?._sum?.collect ?? 0,
    cash: totalCash ?? 0,

    delivery: classWiseDelivery,
    stockSummary: resultSummary,
    sellGraph: allClassGraph,
    deliveryGraph: allClassDeliveryGraph,
  };

  return Informations;
};

// LOAD UNLOAD
const getLoadUnloadReportService = async (user: TAuthUser) => {
  const result = await prisma.brickStockSummary.findFirst({
    where: { vataId: user.vataId }, //need to add season id
  });
  return result;
};

export const ReportService = {
  getTopSellingAreasService,
  dashboardAllReportService,
  getLoadUnloadReportService,
};
