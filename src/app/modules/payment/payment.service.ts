import { Request } from "express";
import { prisma } from "../../../helpers/prisma";
import { IUploadFile } from "../../../interface/multer";
import { Payment, Prisma } from "../../../generated/prisma/client";
import { IPayment } from "./payment.interface";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { TQuery } from "../../../interface/query";
import { modifySearch } from "../../../utils/modifySearch";
import { createMetaConfig } from "../../../utils/createMetaConfig";

const createPaymentService = async (req: Request) => {
  const file = req.file as IUploadFile;
  const body = JSON.parse(req.body.data) as IPayment;
  const ledgerId = await prisma.ledger.findFirst({
    where: { name: body.ledger },
    select: { id: true },
  });
  if (!ledgerId) {
    throw new AppError(StatusCodes.NOT_FOUND, "খতিয়ান পাওয়া যায়নি।");
  }
  const data = {
    ledgerId: ledgerId.id,
    paymentType: body.paymentType,
    paymentDetails: body.paymentDetails,
    quantity: Number(body.quantity),
    rate: Number(body.rate),
    totalBill: Number(body.totalBill),
    cutting: Number(body.cutting),
    payment: Number(body.payment),
    paymentDifference: Number(body.paymentDifference),
    document: file.filename || null,
  };
  const result = await prisma.payment.create({ data });
  return result;
};

// GET ALL PAYMENTS
const geAllPaymentService = async (query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);
  const where: Prisma.PaymentWhereInput = {
    ledger: query.search
      ? {
          is: {
            name: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        }
      : undefined,
  };

  if (query.date) {
    const date = new Date(query.date);
    if (!isNaN(date.getTime())) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      where.createdAt = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }
  }

  const [result, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where,
      include: {
        ledger: { select: { name: true } },
      },
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.count({ where: {} }),
  ]);
  const meta = createMetaConfig({
    limit: pagination.limit,
    page: pagination.page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

// GET PAYMENT REPORT GROUP VIA DATE
const paymentReportViaGroupService = async () => {
  const result = await prisma.payment.findMany({
    include: { ledger: { include: { parent: true } } },
  });
  const groupedPayments = Object.values(
    result.reduce(
      (acc, item) => {
        const groupId = item.ledger.parent?.id ?? item.ledger.id;
        const groupName = item.ledger.parent?.name ?? item.ledger.name;

        if (!acc[groupId]) {
          acc[groupId] = {
            ledgerId: groupId,
            ledger: groupName,
            quantity: 0,
            totalBill: 0,
            cutting: 0,
            payment: 0,
            advancePayment: 0,
            paymentDifference: 0,
          };
        }

        acc[groupId].quantity += item.quantity;
        acc[groupId].totalBill += item.totalBill;
        acc[groupId].cutting += item.cutting;

        if (item.paymentType === "অগ্রিম পেমেন্ট") {
          acc[groupId].advancePayment += item.payment;
        } else {
          acc[groupId].payment += item.payment;
        }

        acc[groupId].paymentDifference += item.paymentDifference;

        return acc;
      },
      {} as Record<
        number,
        {
          ledgerId: number;
          ledger: string;
          quantity: number;
          totalBill: number;
          cutting: number;
          payment: number;
          advancePayment: number;
          paymentDifference: number;
        }
      >,
    ),
  );

  console.log(groupedPayments);
  return groupedPayments;
};

export const PaymentService = {
  createPaymentService,
  geAllPaymentService,
  paymentReportViaGroupService,
};
