import { StatusCodes } from "http-status-codes";
import { Ledger } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { AppError } from "../../errors/ApplicationError";
// GET LEDGER COUNT
const getLedgerCountService = async () => {
  const res = await prisma.ledger.count();
  return res + 1;
};

// CREATE A LEDGER
const createLedgerService = async (data: Ledger) => {
  const isExist = await prisma.ledger.findFirst({
    where: {
      name: data.name,
    },
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "এই নামে একটি লেজার বা লেজার গ্রুপ ইতোমধ্যে রয়েছে।",
    );
  }

  const result = await prisma.ledger.create({
    data,
  });

  return result;
};

// GET GROUP OPTION
const getLedgerOptionService = async () => {
  const res = await prisma.ledger.findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res;
};

// GET ALL LEDGER WITH CHILDREN
const getAllLedgerWithChildrenService = async () => {
  const res = await prisma.ledger.findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      name: true,
      children: { select: { name: true, id: true } },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return res;
};

export const LedgerService = {
  getLedgerCountService,
  createLedgerService,
  getLedgerOptionService,
  getAllLedgerWithChildrenService,
};
