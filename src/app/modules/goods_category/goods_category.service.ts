import { StatusCodes } from "http-status-codes";
import { GoodsStockCategory } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import { AppError } from "../../errors/ApplicationError";
import { ActivityService } from "../activity/activity.service";

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
  const oldCategory = await prisma.goodsStockCategory.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
    select: {
      name: true,
    },
  });

  if (!oldCategory) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "পণ্যের ক্যাটাগরি পাওয়া যায়নি।",
    );
  }

  const formatOldData = {
    name: oldCategory.name,
  };

  const formatNewData = {
    name: payload.name,
  };

  // ADMIN / OWNER
  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.goodsStockCategory.update({
        where: {
          id,
        },
        data: {
          ...payload,
          updateStatus: "APPROVED",
        },
      });

      await ActivityService.createActivityService({
        action: "UPDATE",
        module: "GOODS_STOCK_CATEGORY",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData: formatOldData,
        newData: formatNewData,
      });

      return result;
    });

    return {
      result,
      message: "পণ্যের ক্যাটাগরি সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  // NON ADMIN / OWNER → APPROVAL REQUEST
  const result = await prisma.$transaction(async (tx) => {
    await tx.goodsStockCategory.update({
      where: {
        id,
      },
      data: {
        updateStatus: "PENDING",
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "UPDATE",
        module: "GOODS_STOCK_CATEGORY",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        oldData: formatOldData,
        newData: formatNewData,
      },
    });
  });

  return {
    result,
    message: "পণ্যের ক্যাটাগরি আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

const deleteGoodCategoryService = async (user: TAuthUser, id: string) => {
  const oldCategory = await prisma.goodsStockCategory.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!oldCategory) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "পণ্যের ক্যাটাগরি পাওয়া যায়নি।",
    );
  }

  const formatOldData = {
    name: oldCategory.name,
  };

  // ADMIN / OWNER
  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.goodsStockCategory.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
          deleteStatus: "APPROVED",
        },
      });

      await ActivityService.createActivityService({
        action: "DELETE",
        module: "GOODS_STOCK_CATEGORY",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData: formatOldData,
        referenceNumber: formatOldData.name,
      });

      return result;
    });

    return {
      result,
      message: "পণ্যের ক্যাটাগরি সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  // NON ADMIN / OWNER → DELETE APPROVAL REQUEST
  const result = await prisma.$transaction(async (tx) => {
    await tx.goodsStockCategory.update({
      where: {
        id,
      },
      data: {
        deleteStatus: "PENDING",
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "DELETE",
        module: "GOODS_STOCK_CATEGORY",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        oldData: formatOldData,
      },
    });
  });

  return {
    result,
    message: "পণ্যের ক্যাটাগরি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

export const GoodsCategoryService = {
  createGoodCategoryService,
  getGoodCategoryService,
  getSingleGoodCategoryService,
  updateGoodCategoryService,
  deleteGoodCategoryService,
  getGoodCategoryOptionsService,
};
