import { StatusCodes } from "http-status-codes";
import { CarRent, Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../errors/ApplicationError";
import { TAuthUser } from "../../../interface/token";
import { ActivityService } from "../activity/activity.service";

// CREATE RENT
const createCarRentService = async (user: TAuthUser, data: CarRent) => {
  data.vataId = user.vataId;
  const result = await prisma.carRent.create({ data });
  return result;
};

// GET ALL RENT
const getALlCarRentService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where: Prisma.CarRentWhereInput = { vataId: user.vataId };

  // Search by ledger name
  if (query.search?.trim()) {
    const search = query.search.trim();
    where.OR = [
      {
        area: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        address: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }
  const [result, total] = await Promise.all([
    prisma.carRent.findMany({ where, skip, take: limit }),
    prisma.carRent.count({ where }),
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

// GET SINGLE CAR RENT
const getSingleCarRentService = async (user: TAuthUser, id: string) => {
  const result = await prisma.carRent.findFirst({
    where: { id, vataId: user.vataId },
  });
  return result;
};

const updateCarRentService = async (
  user: TAuthUser,
  id: string,
  payload: Prisma.CarRentUpdateInput,
) => {
  const existing = await prisma.carRent.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!existing) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।",
    );
  }

  const oldData = {
    address: existing.address,
    rent: existing.rent,
    area: existing.area,
  };

  const newData = {
    address: payload.address,
    rent: payload.rent,
    area: payload.area,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.carRent.update({
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
        module: "CAR_RENT",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
        newData,
        referenceNumber: oldData.rent,
      });

      return result;
    });

    return {
      result,
      message: "গাড়ি ভাড়ার তথ্য সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  await prisma.carRent.update({
    where: {
      id,
    },
    data: {
      updateStatus: "PENDING",
    },
  });

  const result = await prisma.approvalRequest.create({
    data: {
      action: "UPDATE",
      module: "CAR_RENT",
      targetId: id,
      requestedById: user.userId,
      vataId: user.vataId,
      status: "PENDING",
      oldData,
      newData,
    },
  });

  return {
    result,
    message: "গাড়ি ভাড়ার তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};
// DELETE CAR RENT

const deleteCarRentService = async (user: TAuthUser, id: string) => {
  const existing = await prisma.carRent.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!existing) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "গাড়ি ভাড়ার তথ্য পাওয়া যায়নি।",
    );
  }

  const oldData = {
    address: existing.address,
    rent: existing.rent,
    area: existing.area,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      await tx.carRent.delete({
        where: { id },
      });

      return await ActivityService.createActivityService({
        action: "DELETE",
        module: "CAR_RENT",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
        referenceNumber: oldData.rent,
      });
    });

    return {
      result,
      message: "গাড়ি ভাড়ার তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  const result = await prisma.carRent.update({
    where: { id },
    data: {
      deleteStatus: "PENDING",
    },
  });

  await prisma.approvalRequest.create({
    data: {
      action: "DELETE",
      module: "CAR_RENT",
      targetId: id,
      requestedById: user.userId,
      vataId: user.vataId,
      status: "PENDING",
      oldData,
    },
  });

  return {
    result,
    message:
      "গাড়ি ভাড়ার তথ্য মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

export const CarRentService = {
  createCarRentService,
  getALlCarRentService,
  getSingleCarRentService,
  updateCarRentService,
  deleteCarRentService,
};
