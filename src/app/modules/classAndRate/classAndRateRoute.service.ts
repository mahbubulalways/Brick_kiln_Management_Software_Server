import { ClassAndRate } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";

const createClassAndRateService = async (payload: ClassAndRate) => {
  const isExist = await prisma.classAndRate.findFirst({
    where: {
      className: payload.className,
      // classType: payload.classType,
    },
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই শ্রেণী ও রেট ইতিমধ্যে বিদ্যমান",
    );
  }
  const result = await prisma.classAndRate.create({
    data: payload,
  });
  return result;
};

// GET ALL CLASS AND RATE
const getClassAndRateService = async () => {
  const result = await prisma.classAndRate.findMany({ orderBy: { createdAt: "asc" } });
  return result;
};
// GET SINGLE CLASS AND RATE
const getSingleClassAndRateService = async (id: number) => {
  const result = await prisma.classAndRate.findFirst({ where: { id } });
  return result;
};

// GET SINGLE CLASS AND RATE
const updateClassAndRateService = async (id: number, data: ClassAndRate) => {
  const result = await prisma.classAndRate.update({
    data: data,
    where: { id },
  });
  return result;
};

export const ClassAndRateService = {
  createClassAndRateService,
  getClassAndRateService,
  getSingleClassAndRateService,
  updateClassAndRateService,
};
