"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = exports.generateDailyNotifications = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const formatDateRange_1 = require("../../../utils/formatDateRange");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const generateDailyNotifications = async () => {
    const now = (0, formatDateRange_1.formatDateRange)({
        start: new Date(),
        end: null,
    });
    const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(now);
    const vatas = await prisma_1.prisma.vata.findMany({
        where: {
            status: "ACTIVE",
        },
        select: {
            id: true,
        },
    });
    const notifications = [];
    for (const vata of vatas) {
        const activeSeason = await prisma_1.prisma.season.findFirst({
            where: {
                vataId: vata.id,
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                vataId: true,
            },
        });
        if (!activeSeason) {
            continue;
        }
        const seasonId = activeSeason.id;
        const customers = await prisma_1.prisma.customer.findMany({
            where: {
                vataId: vata.id,
                isDeleted: false,
                nextPaymentDate: dateRange,
            },
            select: {
                id: true,
                name: true,
                customerDues: {
                    where: {
                        seasonId,
                    },
                    select: {
                        id: true,
                        seasonId: true,
                        dueAmount: true,
                    },
                },
                dueCollections: {
                    where: {
                        seasonId,
                        isDeleted: false,
                    },
                    select: {
                        id: true,
                        seasonId: true,
                        collect: true,
                    },
                },
            },
        });
        for (const customer of customers) {
            const totalDue = customer.customerDues.reduce((sum, item) => sum + Number(item.dueAmount || 0), 0);
            const totalCollect = customer.dueCollections.reduce((sum, item) => sum + Number(item.collect || 0), 0);
            const remainingDue = Math.max(totalDue - totalCollect, 0);
            if (remainingDue <= 0) {
                continue;
            }
            notifications.push({
                vataId: vata.id,
                title: `${customer.name}-এর আজ টাকা দেওয়ার তারিখ`,
                message: `কাস্টমার: ${customer.name}। আজ টাকা দেওয়ার তারিখ। বাকি: ${remainingDue} টাকা। সিজন: ${activeSeason.name}।`,
                type: enums_1.NotificationType.DUE,
                path: "/dashboard/today-will-pay",
                seasonId,
            });
        }
        const challans = await prisma_1.prisma.challan.findMany({
            where: {
                vataId: vata.id,
                isDeleted: false,
                seasonId,
                items: {
                    some: {
                        deliveryDate: dateRange,
                    },
                },
            },
            select: {
                id: true,
                serial: true,
                seasonId: true,
                customer: {
                    select: {
                        name: true,
                    },
                },
                items: {
                    where: {
                        deliveryDate: dateRange,
                    },
                    select: {
                        class: true,
                        delivered: true,
                        quantity: true,
                        deliveryDate: true,
                    },
                },
            },
            orderBy: {
                deliveryDate: "asc",
            },
        });
        for (const challan of challans) {
            const deliveryItems = challan.items.filter((item) => Number(item.delivered) < Number(item.quantity));
            if (deliveryItems.length === 0) {
                continue;
            }
            const deliveryMessage = deliveryItems
                .map((item) => {
                const remaining = Number(item.quantity) - Number(item.delivered);
                return `${item.class}: ${remaining} টি`;
            })
                .join(", ");
            notifications.push({
                vataId: vata.id,
                title: `${challan.customer.name}-এর আজ ডেলিভারি আছে`,
                message: `কাস্টমার: ${challan.customer.name}। ডেলিভারি: ${deliveryMessage}। সিজন: ${activeSeason.name}।`,
                type: enums_1.NotificationType.DELIVERY,
                path: "/dashboard/delivery-today",
                seasonId,
            });
        }
    }
    if (notifications.length === 0) {
        console.log("❌ No notifications to create");
        return [];
    }
    await prisma_1.prisma.notification.createMany({
        data: notifications,
    });
};
exports.generateDailyNotifications = generateDailyNotifications;
// GET UNREAD
const getUnreadNotificationsNumber = async (user, seasonId) => {
    const result = await prisma_1.prisma.notification.count({
        where: { isRead: false, vataId: user.vataId, seasonId },
    });
    return result;
};
// GET ALLA
const getAllNotification = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.notification.findMany({
            where: { vataId: user.vataId, seasonId },
            skip,
            take: limit,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.notification.count({
            where: { vataId: user.vataId, seasonId },
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        data: result,
        meta,
    };
};
// const Update nitifcation
const updateNotification = async (user, id) => {
    const notification = await prisma_1.prisma.notification.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
        select: {
            isRead: true,
        },
    });
    if (!notification) {
        throw new Error("নোটিফিকেশন পাওয়া যায়নি");
    }
    const result = await prisma_1.prisma.notification.update({
        where: {
            id,
        },
        data: {
            isRead: !notification.isRead,
        },
    });
    return result;
};
exports.NotificationService = {
    getUnreadNotificationsNumber,
    getAllNotification,
    updateNotification,
};
