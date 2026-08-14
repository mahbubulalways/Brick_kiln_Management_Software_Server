import { Request } from "express";
import { prisma } from "../../../helpers/prisma";
import { IUploadFile } from "../../../interface/multer";
import { Payment, Prisma } from "../../../generated/prisma/client";
import { IPayment } from "./payment.interface";
import { AppError } from "../../errors/ApplicationError";
import { StatusCodes } from "http-status-codes";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { TQuery } from "../../../interface/query";
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
const getAllPaymentService = async (query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);

  const where: Prisma.PaymentWhereInput = {isDeleted:false};

  // Search by ledger name
  if (query.search?.trim()) {
    where.ledger = {
      is: {
        name: {
          contains: query.search.trim(),
          mode: "insensitive",
        },
      },
    };
  }

  // Filter by date
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
      where: where,
      include: {
        ledger: {
          select: {
            name: true,
            id:true
          },
        },
      },
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.payment.count({
      where: where,
    }),
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
    where:{isDeleted:false},
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

  return groupedPayments;
};

// GET SINGLE PAYMENT 
const getSinglePaymentService = async (id: string) => {
  return prisma.payment.findFirst({ where: { id: Number(id) }, include: { ledger: { select: { name: true } } } })
}


// UPDATE PAYMENT
const updatePaymentService = async (req: Request) => {
  const id = Number(req.params.id);

  const file = req.file as IUploadFile | undefined;

  const body = JSON.parse(req.body.data) as IPayment;

  // ============================================
  // 1. Check existing payment
  // ============================================
  const existingPayment = await prisma.payment.findUnique({
    where: {
      id,
    },
  });

  if (!existingPayment) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "পেমেন্ট পাওয়া যায়নি।",
    );
  }

  // ============================================
  // 2. Find ledger
  // ============================================
  const ledger = await prisma.ledger.findFirst({
    where: {
      name: body.ledger,
    },
    select: {
      id: true,
    },
  });

  if (!ledger) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "খতিয়ান পাওয়া যায়নি।",
    );
  }

  // ============================================
  // 3. Prepare update data
  // ============================================
  const data:any = {
    ledgerId: ledger.id,
    paymentType: body.paymentType,
    paymentDetails: body.paymentDetails,
    quantity: Number(body.quantity)||0,
    rate: Number(body.rate)||0,
    totalBill: Number(body.totalBill)||0,
    cutting: Number(body.cutting)||0,
    payment: Number(body.payment)||0,
    paymentDifference: Number(body.paymentDifference)||0,
    paymentDate:body.paymentDate
  };

  // ============================================
  // 4. New file থাকলে শুধু তখন document update
  // ============================================
  if (file?.filename) {
    data.document = file.filename;
  }

  // ============================================
  // 5. Update
  // ============================================
  const result = await prisma.payment.update({
    where: {
      id,
    },
    data,
  });

  return result;
};


// DELETE PAYMENT 
const deletePaymentServie =async(id:string)=>{
  return await prisma.payment.update({where:{id:Number(id)},data:{isDeleted:true}})

}

export const PaymentService = {
  createPaymentService,
  getAllPaymentService,
  paymentReportViaGroupService,
  getSinglePaymentService,
  updatePaymentService,
  deletePaymentServie
};
