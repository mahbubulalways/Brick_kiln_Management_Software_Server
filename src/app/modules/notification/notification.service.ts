import { NotificationType } from "../../../generated/prisma/enums";
import { prisma } from "../../../helpers/prisma";
import { formatDateRange } from "../../../utils/formatDateRange";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";

export const generateDailyNotifications = async () => {
  const now = formatDateRange({ start: new Date(), end: null });
  const dateRange = getDateRangeDbSearch(now);

  const findVata = await prisma.vata.findMany({
    where: {
      status: "ACTIVE",
    },
    select: {
      id: true,
    },
  });

  const activeSeason = await prisma.season.findFirst({
    where: {
      isActive: true,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!activeSeason) {
    return [];
  }

  const notifications = [];
  for (const vata of findVata) {
    const customers = await prisma.customer.findMany({
      where: {
        vataId: vata.id,
        isDeleted: false,
        // nextPaymentDate: dateRange,
      },
      select: {
        name: true,

        customerDues: {
          where: {
            seasonId: activeSeason.id,
          },
          select: {
            dueAmount: true,
          },
        },

        dueCollections: {
          where: {
            seasonId: activeSeason.id,
            isDeleted: false,
          },
          select: {
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

      if (remainingDue > 0) {
        notifications.push({
          vataId: vata.id,
          title: `${customer.name}-এর আজ টাকা দেওয়ার তারিখ`,
          message: `কাস্টমার: ${customer.name}। আজ টাকা দেওয়ার তারিখ। বাকি: ${remainingDue} টাকা। সিজন: ${activeSeason.name}।`,
          type: NotificationType.DUE,
          path: "/dashboard/due-collection",
        });
      }
    }

    const result = await prisma.challan.findMany({
      where: {
        vataId: vata.id,
        isDeleted: false,
        seasonId: activeSeason.id,
        items: {
          some: {
            deliveryDate: dateRange,
          },
        },
      },
      select: {
        id: true,
        serial: true,
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
          },
        },
      },
      orderBy: {
        deliveryDate: "asc",
      },
    });

    const filteredResult = result.filter((challan) =>
      challan.items.some(
        (item) => Number(item.delivered) < Number(item.quantity),
      ),
    );

    for (const challan of filteredResult) {
      const deliveryItems = challan.items.filter(
        (item) => Number(item.delivered) < Number(item.quantity),
      );

      const deliveryMessage = deliveryItems
        .map(
          (item) =>
            `${item.class}: ${
              Number(item.quantity) - Number(item.delivered)
            } টি`,
        )
        .join(", ");

      notifications.push({
        vataId: vata.id,
        title: `${challan.customer.name}-এর আজ ডেলিভারি আছে`,
        message: `কাস্টমার: ${challan.customer.name}। ডেলিভারি: ${deliveryMessage}। সিজন: ${activeSeason.name}।`,
        type: NotificationType.DELIVERY,
        path: "/dashboard/todays-delivery",
      });
    }
  }

  console.log(notifications);

  return notifications;
};
