import { NotificationType } from "../../../generated/prisma/enums";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { formatDateRange } from "../../../utils/formatDateRange";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";

export const generateDailyNotifications = async () => {
  const now = formatDateRange({
    start: new Date(),
    end: null,
  });

  const dateRange = getDateRangeDbSearch(now);

  const vatas = await prisma.vata.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
    },
  });

  const notifications = [];

  for (const vata of vatas) {
    const activeSeason = await prisma.season.findFirst({
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
    const customers = await prisma.customer.findMany({
      where: {
        vataId: vata.id,
        isDeleted: false,
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
      const totalDue = customer.customerDues.reduce(
        (sum, item) => sum + Number(item.dueAmount || 0),
        0,
      );

      const totalCollect = customer.dueCollections.reduce(
        (sum, item) => sum + Number(item.collect || 0),
        0,
      );

      const remainingDue = Math.max(totalDue - totalCollect, 0);
      if (remainingDue <= 0) {
        continue;
      }

      notifications.push({
        vataId: vata.id,
        title: `${customer.name}-এর আজ টাকা দেওয়ার তারিখ`,
        message: `কাস্টমার: ${customer.name}। আজ টাকা দেওয়ার তারিখ। বাকি: ${remainingDue} টাকা। সিজন: ${activeSeason.name}।`,
        type: NotificationType.DUE,
        path: "/dashboard/due-collection",
        seasonId,
      });
    }

    const challans = await prisma.challan.findMany({
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
      const deliveryItems = challan.items.filter(
        (item) => Number(item.delivered) < Number(item.quantity),
      );

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
        type: NotificationType.DELIVERY,
        path: "/dashboard/todays-delivery",
        seasonId,
      });
    }
  }

  if (notifications.length === 0) {
    console.log("❌ No notifications to create");

    return [];
  }

  await prisma.notification.createMany({
    data: notifications,
  });
};

// GET UNREAD
const getUnreadNotificationsNumber = async (
  user: TAuthUser,
  seasonId: string,
) => {
  const result = await prisma.notification.count({
    where: { isRead: false, vataId: user.vataId, seasonId },
  });
  return result;
};

// GET ALLA
const getAllNotification = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const [result, total] = await Promise.all([
    prisma.notification.findMany({
      where: { vataId: user.vataId, seasonId },
      skip,
      take: limit,
    }),
    prisma.notification.count({
      where: { vataId: user.vataId, seasonId },
    }),
  ]);

  const meta = createMetaConfig({
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
const updateNotification = async (user: TAuthUser, id: string) => {
  const notification = await prisma.notification.findFirst({
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

  const result = await prisma.notification.update({
    where: {
      id,
    },
    data: {
      isRead: !notification.isRead,
    },
  });

  return result;
};

export const NotificationService = {
  getUnreadNotificationsNumber,
  getAllNotification,
  updateNotification,
};
