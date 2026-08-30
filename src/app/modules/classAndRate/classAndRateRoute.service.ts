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

  const deletedRecord =
    await prisma.classAndRate.findFirst({
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
    const result =
      await prisma.classAndRate.update({
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

  const result =
    await prisma.classAndRate.create({
      data: {
        ...payload,
        vataId: user.vataId,
      },
    });

  return result;
};

// GET ALL CLASS AND RATE
const getClassAndRateService = async (user: TAuthUser, query: TQuery) => {
  const { limit, page, skip } = paginationHelper(
    query.page,
    query.limit,
  );

  const [result, total] = await Promise.all([
    prisma.classAndRate.findMany({
      where: {
        vataId: user.vataId,
        isDeleted: false
      }, orderBy: { createdAt: "asc" },


    }),
    prisma.classAndRate.count({
      where: {
        vataId: user.vataId,
        isDeleted: false
      }
    })
  ]);

    const meta = createMetaConfig({
          limit,
          page,
          totalData: total,
      });

  return {
    data:result,
    meta
  };
};


// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (user: TAuthUser, id: string) => {
  const result = await prisma.classAndRate.findFirst({
    where: {
      vataId: user.vataId, id,
      isDeleted: false
    }
  });
  return result;
};

// GET SINGLE CLASS AND RATE
const updateClassAndRateService = async (user: TAuthUser, id: string, data: ClassAndRate) => {
  const result = await prisma.classAndRate.update({
    data: data,
    where: { vataId: user.vataId, id },
  });
  return result;
};

// DELETYE
const deleteClassAndRateService = async (user: TAuthUser, id: string) => {
  const result = await prisma.classAndRate.update({
    data: {
      isDeleted: true
    },
    where: { vataId: user.vataId, id },
  });
  return result;
};

export const ClassAndRateService = {
  createClassAndRateService,
  getClassAndRateService,
  getSingleClassAndRateService,
  updateClassAndRateService,
  deleteClassAndRateService
};
