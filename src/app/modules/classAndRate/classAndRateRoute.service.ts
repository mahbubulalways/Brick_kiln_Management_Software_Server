import { ClassAndRate } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

const createClassAndRateService = async (
  user: TAuthUser,
  payload: ClassAndRate,
) => {
  // ==========================================
  // CHECK ACTIVE RECORD
  // ==========================================

  const isExist = await prisma.classAndRate.findFirst({
    where: {
      vataId: user.vataId,
      classType: payload.classType,
      className: payload.className,
      isDeleted: false,
    },
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই শ্রেণীর তথ্য ইতিমধ্যে বিদ্যমান",
    );
  }

  // ==========================================
  // CHECK DELETED RECORD
  // ==========================================

  const deletedRecord = await prisma.classAndRate.findFirst({
    where: {
      vataId: user.vataId,
      classType: payload.classType,
      className: payload.className,
      isDeleted: true,
    },
  });

  // ==========================================
  // RESTORE DELETED RECORD
  // ==========================================

  if (deletedRecord) {
    const result = await prisma.classAndRate.update({
      where: {
        id: deletedRecord.id,
      },
      data: {
        ...payload,
        isDeleted: false,
      },
    });

    return result;
  }

  // ==========================================
  // CREATE NEW RECORD
  // ==========================================

  const result = await prisma.classAndRate.create({
    data: {
      ...payload,
      vataId: user.vataId,
    },
  });

  return result;
};

// GET ALL CLASS AND RATE
const getClassAndRateService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  const [result, total] = await Promise.all([
    prisma.classAndRate.findMany({
      where: {
        vataId: user.vataId,
        isDeleted: false,
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.classAndRate.count({
      where: {
        vataId: user.vataId,
        isDeleted: false,
      },
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

// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (user: TAuthUser, id: string) => {
  const result = await prisma.classAndRate.findFirst({
    where: {
      vataId: user.vataId,
      id,
      isDeleted: false,
    },
  });
  return result;
};

// UPDATE CLASS AND RATEs
const updateClassAndRateService = async (
  user: TAuthUser,
  id: string,
  data: ClassAndRate,
) => {
  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.classAndRate.update({
      data,
      where: {
        vataId: user.vataId,
        id,
      },
    });

    return {
      result,
      message: "শ্রেণী ও রেট সফলভাবে আপডেট হয়েছে",
    };
  }

  const findClassRate = await prisma.classAndRate.findFirst({
    where: {
      vataId: user.vataId,
      id,
    },
    select: {
      advanceRate: true,
      className: true,
      classType: true,
      rate: true,
    },
  });

  if (!findClassRate) {
    throw new Error("শ্রেণী ও রেট পাওয়া যায়নি");
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.classAndRate.update({
      data: {
        updateStatus: "PENDING",
      },
      where: {
        vataId: user.vataId,
        id,
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "UPDATE",
        module: "CLASS_RATE",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        oldData: findClassRate,
        newData: data,
      },
    });
  });

  return {
    result,
    message: "শ্রেণী ও রেট আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

// DELETE CLASS AND RATE
const deleteClassAndRateService = async (user: TAuthUser, id: string) => {
  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.classAndRate.update({
      data: {
        isDeleted: true,
      },
      where: {
        vataId: user.vataId,
        id,
      },
    });

    return {
      result,
      message: "শ্রেণী ও রেট সফলভাবে মুছে ফেলা হয়েছে",
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.classAndRate.update({
      data: {
        deleteStatus: "PENDING",
      },
      where: {
        vataId: user.vataId,
        id,
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "DELETE",
        module: "CLASS_RATE",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
      },
    });
  });

  return {
    result,
    message: "শ্রেণী ও রেট মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

// GET OPTIONS
const getClassAndRateOptionsService = async (user: TAuthUser) => {
  const result = await prisma.classAndRate.findMany({
    where: {
      vataId: user.vataId,
      isDeleted: false,
    },
    select: {
      className: true,
      id: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return result;
};

export const ClassAndRateService = {
  createClassAndRateService,
  getClassAndRateService,
  getSingleClassAndRateService,
  updateClassAndRateService,
  deleteClassAndRateService,
  getClassAndRateOptionsService,
};
