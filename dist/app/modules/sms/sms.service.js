"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const purchaseManualSmsService = async (user, payload) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
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
    });
    return result;
};
// GET MY VATA MSG INFO
const getMyVatarSmsReportService = async (user) => {
    return await prisma_1.prisma.smsWallet.findFirst({
        where: {
            vataId: user.vataId,
        },
    });
};
// GET PURCHASE MSG HISTORY
const getSmspurchaseHistroyService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.smsRechargeHistory.findMany({
            where: {
                vataId: user.vataId,
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.smsRechargeHistory.count(),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
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
const getManualSmspurchaseRequestService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.smsRechargeHistory.findMany({
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
        prisma_1.prisma.smsRechargeHistory.count(),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
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
const getAllSmspurchaseHistoryService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.smsRechargeHistory.findMany({
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
        prisma_1.prisma.smsRechargeHistory.count(),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
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
const updateSmsPaymentStatusService = async (id, payload) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
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
            }
            else {
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
    });
    return result;
};
exports.SmsService = {
    purchaseManualSmsService,
    getMyVatarSmsReportService,
    getSmspurchaseHistroyService,
    getManualSmspurchaseRequestService,
    getAllSmspurchaseHistoryService,
    updateSmsPaymentStatusService,
};
