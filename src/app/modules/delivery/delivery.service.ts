import { TDelivery } from "./deliveryinterface";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../helpers/prisma";
import { Prisma } from "../../../generated/prisma/client";

const getNextDeliveryNo = async () => {
  const result = await prisma.delivery.findFirst({
    orderBy: {
      deliveryNo: "desc",
    },
    select: {
      deliveryNo: true,
    },
  });

  return result ? result.deliveryNo + 1 : 1;
};

const getDeliveryThatGoTodayService = async (date: string) => {
  const parsedDate = new Date(date);

  // Create start and end of day boundaries
  const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

  // Fetch deliveries within the day
  const result = await prisma.challan.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      customer: true,
      items: {
        where: {
          deliveryDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      },
    },
    orderBy: {
      deliveryDate: "asc",
    },
  });

  // Filter out challans with no items
  const filteredResult = result.filter((challan) => challan.items.length > 0);

  return filteredResult.length > 0 ? filteredResult : [];
};

// CREATE DELIVERY
const createDeliveryService = async (payload: TDelivery) => {
  const isDeliveryNoExist = await prisma.delivery.findFirst({
    where: {
      deliveryNo: Number(payload?.deliveryNo),
    },
  });

  if (isDeliveryNoExist?.id) {
    throw new AppError(StatusCodes.CONFLICT, "এই ডেলিভারি নম্বর ইতিমধ্যে আছে");
  }

  const data = {
    deliveryDate: payload.deliveryDate,
    deliveryNo: Number(payload.deliveryNo),
    nextDeliveryDate: payload.nextDeliveryDate,
    quantity: Number(payload.items.quantity),
    deliveryReceived: Number(payload.items.todaysDelivery),
    class: payload.items.class,
    deliveryRemaining: Number(payload.items.remainingDelivery),
    driverName: payload.driverName,
    driverPhoneNumber: payload.driverMobileNumber,
    carNo: payload.carNumber,
    invoiceId: Number(payload.invoiceId),
    carRent: Number(payload.carRent),
  };

  // if (payload?.savingType == "saveOnly") {
  //   if (!isDeliveryNoExist?.id) {
  //     throw new AppError(
  //       StatusCodes.CONFLICT,
  //       "নতুন কোন ডেলিভারি ক্রিয়েট করা হয়নি"
  //     );
  //   }
  //   const result = await prisma.$transaction(
  //     async (tx: Prisma.TransactionClient) => {
  //       const calculate =
  //         isDeliveryNoExist.deliveryReceived - data.deliveryReceived;
  //       const createDelivery = await tx.delivery.update({
  //         data: {
  //           deliveryDate: data.deliveryDate,
  //           class: data.class,
  //           deliveryReceived: data.deliveryReceived,
  //           deliveryRemaining: data.deliveryRemaining,
  //           nextDeliveryDate: data.nextDeliveryDate,
  //           quantity: data.quantity,
  //           carNo: data.carNo,
  //           driverName: data.driverName,
  //           driverPhoneNumber: data.driverPhoneNumber,
  //           invoiceId: Number(payload.invoiceId),
  //         },
  //         where: {
  //           deliveryNo: data?.deliveryNo,
  //         },
  //       });

  //       const updateItem = await tx.challanItem.update({
  //         data: {
  //           delivered: {
  //             increment: calculate,
  //           },
  //         },
  //         where: {
  //           id: Number(payload?.itemId),
  //         },
  //       });

  //       console.log(updateItem);
  //       return createDelivery;
  //     }
  //   );
  // }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const createDelivery = await tx.delivery.create({
        data: {
          deliveryDate: data.deliveryDate,
          class: data.class,
          deliveryNo: data.deliveryNo,
          deliveryReceived: data.deliveryReceived,
          deliveryRemaining: data.deliveryRemaining,
          nextDeliveryDate: data.nextDeliveryDate,
          quantity: data.quantity,
          carNo: data.carNo,
          driverName: data.driverName,
          driverPhoneNumber: data.driverPhoneNumber,
          invoiceId: Number(payload.invoiceId),
          carRent: data.carRent,
        },
      });

      if (data?.deliveryRemaining) {
        const update = await tx.challanItem.update({
          data: {
            deliveryDate: data.nextDeliveryDate,
          },
          where: {
            id: payload.itemId,
          },
        });

        console.log(update);
      }

      const updateItem = await tx.challanItem.update({
        data: {
          delivered: {
            increment: data?.deliveryReceived,
          },
        },
        where: {
          id: Number(payload?.itemId),
        },
      });

      return createDelivery;
    },
  );
  return result;
};

//

const getTodaysDeliveryThatDone = async (date: string) => {
  const parsedDate = new Date(date);

  // Create start and end of day boundaries
  const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

  const result = await prisma.delivery.findMany({
    where: {
      deliveryDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
      isDeleted: false,
    },
    include: {
      invoice: {
        select: {
          customer: true,
        },
      },
    },
  });
  console.log(result);
  return result;
};

// GET ALL DELIVERY

const getAllDeliveryListService = async (
  startDate?: string,
  endDate?: string,
) => {
  const dateFilter =
    startDate && endDate
      ? {
          deliveryDate: {
            gte: startDate,
            lte: endDate,
          },
        }
      : {};

  const result = await prisma.challan.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      note: true,
      cash: true,
      id: true,
      due: true,
      customer: {
        select: {
          name: true,
          address: true,
          totalPurchased: true,
          totalPaid: true,
        },
      },
      items: {
        where: dateFilter,
      },
    },
  });

  return result;
};

const getSingleDeliveryService = async (id: number) => {
  const result = await prisma.delivery.findFirst({ where: { id } });
  return result;
};

export const DeliveryService = {
  getNextDeliveryNo,
  getDeliveryThatGoTodayService,
  createDeliveryService,
  getTodaysDeliveryThatDone,
  getAllDeliveryListService,
  getSingleDeliveryService,
};
