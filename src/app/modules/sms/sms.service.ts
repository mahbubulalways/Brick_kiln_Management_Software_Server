import { Prisma, SmsRechargeStatus } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { TSMSPurchase } from "./sms.interface";

const purchaseManualSmsService = async (
  user: TAuthUser,
  payload: TSMSPurchase,
) => {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const history = await tx.smsRechargeHistory.create({
        data: {
          ratePerSms: Number(payload.ratePerSms),
          smsQuantity: Number(payload.smsQuantity),
          totalAmount: Number(payload.totalAmount),
          paymentMethod: payload.paymentMethod,
          status: "PENDING",
          transactionId: payload.transactionId,
          vataId: user.vataId,
          phoneNumber: payload.phoneNumber,
          type: "MANUAL",
        },
      });

      //   const wallet = await tx.smsWallet.findUnique({
      //     where: {
      //       vataId: user.vataId,
      //     },
      //   });

      //   if (wallet) {
      //     await tx.smsWallet.update({
      //       where: {
      //         vataId: user.vataId,
      //       },
      //       data: {
      //         balance: {
      //           increment: Number(payload.totalAmount),
      //         },
      //         totalPurchased: {
      //           increment: Number(payload.smsQuantity),
      //         },
      //         currentRate: Number(payload.ratePerSms),
      //       },
      //     });
      //   } else {
      //     await tx.smsWallet.create({
      //       data: {
      //         vataId: user.vataId,
      //         balance: Number(payload.totalAmount),
      //         currentRate: Number(payload.ratePerSms),
      //         totalPurchased: Number(payload.smsQuantity),
      //       },
      //     });
      //   }

      return history;
    },
  );

  return result;
};

// GET MY VATA MSG INFO
const getMyVatarSmsReportService = async (user: TAuthUser) => {
  return await prisma.smsWallet.findFirst({
    where: {
      vataId: user.vataId,
    },
  });
};

// GET PURCHASE MSG HISTORY
const getSmspurchaseHistroyService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.smsRechargeHistory.findMany({
      where: {
        vataId: user.vataId,
      },
      skip,
      take: limit,
    }),

    prisma.smsRechargeHistory.count(),
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

// MANUALLY APROVED NEED
const getManualSmspurchaseRequestService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.smsRechargeHistory.findMany({
      where: {
        type: "MANUAL",
        status: "PENDING",
      },
      include: {
        vata: {
          select: {
            vataId: true,
            nameBangla: true,
          },
        },
      },

      take: limit,
      skip,
    }),
    prisma.smsRechargeHistory.count(),
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

// MANUALLY APROVED NEED
const getAllSmspurchaseHistoryService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.smsRechargeHistory.findMany({
      where: {
        status: {
          not: "PENDING",
        },
      },
      include: {
        vata: {
          select: {
            vataId: true,
            nameBangla: true,
          },
        },
      },

      take: limit,
      skip,
    }),
    prisma.smsRechargeHistory.count(),
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

// UPDATE SMS PAYMENT STATUS
const updateSmsPaymentStatusService = async (
  id: string,
  payload: { status: SmsRechargeStatus },
) => {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // GET PAYMENT HISTORY
      const history = await tx.smsRechargeHistory.findUnique({
        where: {
          id,
        },
      });

      if (!history) {
        throw new Error("SMS পেমেন্টের তথ্য পাওয়া যায়নি");
      }

      // Already PAID হলে আবার wallet balance increase করবে না
      if (history.status === "PAID" && payload.status === "PAID") {
        return history;
      }

      // UPDATE STATUS
      const updatedHistory = await tx.smsRechargeHistory.update({
        where: {
          id,
        },
        data: {
          status: payload.status,
        },
      });

      // শুধুমাত্র PAID হলে wallet update হবে
      if (payload.status === "PAID") {
        const wallet = await tx.smsWallet.findUnique({
          where: {
            vataId: history.vataId,
          },
        });

        if (wallet) {
          await tx.smsWallet.update({
            where: {
              vataId: history.vataId,
            },
            data: {
              balance: {
                increment: Number(history.totalAmount),
              },
              totalPurchased: {
                increment: Number(history.smsQuantity),
              },
              currentRate: Number(history.ratePerSms),
            },
          });
        } else {
          await tx.smsWallet.create({
            data: {
              vataId: history.vataId,
              balance: Number(history.totalAmount),
              currentRate: Number(history.ratePerSms),
              totalPurchased: Number(history.smsQuantity),
            },
          });
        }
      }
      return updatedHistory;
    },
  );

  return result;
};

export const SmsService = {
  purchaseManualSmsService,
  getMyVatarSmsReportService,
  getSmspurchaseHistroyService,
  getManualSmspurchaseRequestService,
  getAllSmspurchaseHistoryService,
  updateSmsPaymentStatusService,
};
