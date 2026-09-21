import { VataCar } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

// CRREATE CAR
const createNewVataACarService = async (user: TAuthUser, payload: VataCar) => {
  const result = await prisma.vataCar.create({
    data: {
      ...payload,
      vataId: user.vataId,
    },
  });
  return result;
};

// GET CAR
const getAllVataACarService = async (user: TAuthUser) => {
  const result = await prisma.vataCar.findMany({
    where: {
      vataId: user.vataId,
    },
  });

  return result;
};

// GET SINGLE CAR AND DETAILS
const singleCarDeliveryIncomeService = async (user: TAuthUser, id: string) => {
  const result = await prisma.vataCar.findFirst({
    where: { vataId: user.vataId, id },
    select: {
      carIncomeDeliveries: {
        select: {
          amount: true,
          createdAt: true,
          delivery: {
            select: {
              deliveryNo: true,
            },
          },
          driver: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return result;
};

// GET ALL CAR INCOME HISTORY
const getAllCarIncomeHistory = async (user: TAuthUser) => {
  const result = await prisma.vataCar.findMany({
    where: { vataId: user.vataId },
    select: {
      carNo: true,
      id: true,
      carIncomeDeliveries: {
        select: {
          amount: true,
        },
      },
    },
  });
  return result;
};

export const VataCarService = {
  createNewVataACarService,
  getAllVataACarService,
  singleCarDeliveryIncomeService,
  getAllCarIncomeHistory,
};
