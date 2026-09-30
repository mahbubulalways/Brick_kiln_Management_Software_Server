import { StatusCodes } from "http-status-codes";
import { Driver } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../errors/ApplicationError";
import { ActivityService } from "../activity/activity.service";

// ড্রাইভার তৈরি
const createDriverService = async (user: TAuthUser, payload: Driver) => {
  const driver = await prisma.driver.create({
    data: {
      name: payload.name,
      PhoneNumber: payload.PhoneNumber,
      salary: payload.salary,
      vataId: user.vataId,
    },
  });

  return driver;
};

// সকল ড্রাইভার পাওয়া
const getAllDriversService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const [drivers, total] = await Promise.all([
    prisma.driver.findMany({
      where: {
        vataId: user.vataId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip,
    }),
    prisma.driver.count({ where: { isDeleted: false } }),
  ]);
  const meta = createMetaConfig({
    limit,
    page,
    totalData: total,
  });
  return {
    data: drivers,
    meta,
  };
};

// নির্দিষ্ট একজন ড্রাইভার পাওয়া
const getSingleDriverService = async (user: TAuthUser, id: string) => {
  const driver = await prisma.driver.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!driver) {
    throw new Error("ড্রাইভার খুঁজে পাওয়া যায়নি");
  }

  return driver;
};

const updateDriverService = async (
  user: TAuthUser,
  id: string,
  payload: Partial<Driver>,
) => {
  const existingDriver = await prisma.driver.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!existingDriver) {
    throw new AppError(StatusCodes.NOT_FOUND, "ড্রাইভার খুঁজে পাওয়া যায়নি।");
  }

  const oldData = {
    name: existingDriver.name,
    PhoneNumber: existingDriver.PhoneNumber,
    salary: existingDriver.salary,
  };

  const newData = {
    name: payload.name ?? existingDriver.name,
    PhoneNumber: payload.PhoneNumber ?? existingDriver.PhoneNumber,
    salary: payload.salary ?? existingDriver.salary,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      const result = await tx.driver.update({
        where: {
          id,
        },
        data: {
          ...(payload.name !== undefined && {
            name: payload.name,
          }),
          ...(payload.PhoneNumber !== undefined && {
            PhoneNumber: payload.PhoneNumber,
          }),
          ...(payload.salary !== undefined && {
            salary: payload.salary,
          }),
          updateStatus: "APPROVED",
        },
      });

      await ActivityService.createActivityService({
        action: "UPDATE",
        module: "DRIVER",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
        newData,
        referenceNumber: oldData.name,
      });

      return result;
    });

    return {
      result,
      message: "ড্রাইভারের তথ্য সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  await prisma.driver.update({
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
      module: "DRIVER",
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
    message: "ড্রাইভারের তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

// ড্রাইভার ডিলিট
const deleteDriverService = async (user: TAuthUser, id: string) => {
  const existingDriver = await prisma.driver.findFirst({
    where: {
      id,
      vataId: user.vataId,
    },
  });

  if (!existingDriver) {
    throw new AppError(StatusCodes.NOT_FOUND, "ড্রাইভার খুঁজে পাওয়া যায়নি।");
  }

  const oldData = {
    name: existingDriver.name,
    PhoneNumber: existingDriver.PhoneNumber,
    salary: existingDriver.salary,
  };

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.$transaction(async (tx) => {
      await tx.driver.update({
        where: {
          id,
        },
        data: {
          isDeleted: true,
        },
      });

      return await ActivityService.createActivityService({
        action: "DELETE",
        module: "DRIVER",
        targetId: id,
        userId: user.userId,
        vataId: user.vataId,
        oldData,
        referenceNumber: oldData.name,
      });
    });

    return {
      result,
      message: "ড্রাইভার সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  await prisma.driver.update({
    where: {
      id,
    },
    data: {
      deleteStatus: "PENDING",
    },
  });

  const result = await prisma.approvalRequest.create({
    data: {
      action: "DELETE",
      module: "DRIVER",
      targetId: id,
      requestedById: user.userId,
      vataId: user.vataId,
      status: "PENDING",
      oldData,
    },
  });

  return {
    result,
    message: "ড্রাইভার মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
  };
};

const driverOptionsForDeliveryService = async (user: TAuthUser) => {
  const driver = await prisma.driver.findMany({
    where: {
      vataId: user.vataId,
    },
    select: { name: true, id: true, PhoneNumber: true },
  });
  return driver;
};

export const DriverService = {
  createDriverService,
  getAllDriversService,
  getSingleDriverService,
  updateDriverService,
  deleteDriverService,
  driverOptionsForDeliveryService,
};
