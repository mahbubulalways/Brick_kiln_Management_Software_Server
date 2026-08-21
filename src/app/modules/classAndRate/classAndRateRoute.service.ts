import { ClassAndRate } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

const createClassAndRateService = async (user: TAuthUser, payload: ClassAndRate) => {
  const isExist = await prisma.classAndRate.findFirst({
    where: {
      className: payload.className,
      vataId: user.vataId
    },
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই শ্রেণী ও রেট ইতিমধ্যে বিদ্যমান",
    );
  }

  const result = await prisma.classAndRate.create({
    data: {
      ...payload,
      vataId: user.vataId
    },
  });
  return result;
};

// GET ALL CLASS AND RATE
const getClassAndRateService = async (user: TAuthUser) => {
  const result = await prisma.classAndRate.findMany({
    where: {
      vataId: user.vataId
    }, orderBy: { createdAt: "asc" }
  });
  return result;
};


// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (user: TAuthUser, id: string) => {
  const result = await prisma.classAndRate.findFirst({
    where: {
      vataId: user.vataId, id
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

export const ClassAndRateService = {
  createClassAndRateService,
  getClassAndRateService,
  getSingleClassAndRateService,
  updateClassAndRateService,
};
