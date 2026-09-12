import { GoodsStockCategory } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

const createGoodCategoryService = async (
  user: TAuthUser,
  payload: GoodsStockCategory,
) => {
  const result = await prisma.goodsStockCategory.create({
    data: {
      ...payload,
      vataId: user.vataId,
    },
  });
  return result;
};

const getGoodCategoryService = async (user: TAuthUser) => {
  const result = await prisma.goodsStockCategory.findMany({
    where: {
      vataId: user.vataId,
      isDeleted: false,
    },
    include: {
      _count: { select: { goodsStocks: true } },
    },
  });
  return result;
};

const getGoodCategoryOptionsService = async (user: TAuthUser) => {
  const result = await prisma.goodsStockCategory.findMany({
    where: {
      vataId: user.vataId,
      isDeleted: false,
    },
    select: {
      name: true,
      id: true,
    },
  });
  return result;
};

const getSingleGoodCategoryService = async (user: TAuthUser, id: string) => {
  const result = await prisma.goodsStockCategory.findFirst({
    where: {
      vataId: user.vataId,
      id,
    },
  });
  return result;
};

const updateGoodCategoryService = async (
  user: TAuthUser,
  id: string,
  payload: GoodsStockCategory,
) => {
  const result = await prisma.goodsStockCategory.update({
    where: {
      vataId: user.vataId,
      id,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

const deleteGoodCategoryService = async (user: TAuthUser, id: string) => {
  const result = await prisma.goodsStockCategory.update({
    where: {
      vataId: user.vataId,
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const GoodsCategoryService = {
  createGoodCategoryService,
  getGoodCategoryService,
  getSingleGoodCategoryService,
  updateGoodCategoryService,
  deleteGoodCategoryService,
  getGoodCategoryOptionsService,
};
