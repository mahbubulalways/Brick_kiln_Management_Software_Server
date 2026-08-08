import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/ApplicationError";
import { Customer } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";

const createCustomer = async (payload: Customer) => {
  const isExist = await prisma.customer.findFirst({
    where: {
      phoneNumber: payload.phoneNumber,
    },
  });

  if (isExist) {
    throw new AppError(StatusCodes.CONFLICT, "user with");
  }
};

export const CustomerService = {};
