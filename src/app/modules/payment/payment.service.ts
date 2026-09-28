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
import { TAuthUser } from "../../../interface/token";
import { getDateRangeDbSearch } from "../../../utils/getDateRangeDbSearch";
import { ActivityService } from "../activity/activity.service";

const createPaymentService = async (req: Request, user: TAuthUser) => {
  const file = req?.file as IUploadFile;
  const body = JSON.parse(req.body.data) as IPayment;
  const ledgerId = await prisma.ledger.findFirst({
    where: { name: body.ledger, vataId: user.vataId, isDeleted: false },
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
    document: file?.filename || null,
    address: body.address || null,
  };
  const result = await prisma.payment.create({
    data: { ...data, vataId: user.vataId },
  });
  return result;
};

// GET ALL PAYMENTS
const getAllPaymentService = async (
  user: TAuthUser,
  seasonId: string,
  query: TQuery,
) => {
  const pagination = paginationHelper(query.page, query.limit);

  const where: Prisma.PaymentWhereInput = {
    vataId: user.vataId,
    isDeleted: false,
    ledger: {
      seasonId,
    },
  };

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
    const dateRange = getDateRangeDbSearch(query.date);
    where.createdAt = dateRange;
  }

  const [result, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where: where,
      include: {
        ledger: {
          select: {
            name: true,
            id: true,
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
const paymentReportViaGroupService = async (
  user: TAuthUser,
  seasonId: string,
  date: string,
) => {
  const where: Prisma.PaymentWhereInput = {
    isDeleted: false,
    vataId: user.vataId,
    ledger: {
      seasonId,
    },
  };

  if (date) {
    const dateRange = getDateRangeDbSearch(date);
    if (dateRange) {
      where.paymentDate = dateRange;
    }
  }
  const result = await prisma.payment.findMany({
    where,
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
        string,
        {
          ledgerId: string;
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
const getSinglePaymentService = async (user: TAuthUser, id: string) => {
  return prisma.payment.findFirst({
    where: { vataId: user.vataId, id: id },
    include: { ledger: { select: { name: true } } },
  });
};

// UPDATE PAYMENT
const updatePaymentService = async (
  user: TAuthUser,
  req: Request | null,
  approval: IPayment | null = null,
  targetId: string | null = null,
) => {
  const id = req?.params?.id ?? targetId;

  const file = req?.file as IUploadFile | undefined;

  const body = req?.body?.data
    ? (JSON.parse(req?.body?.data) as IPayment)
    : (approval as IPayment);

  // ============================================
  // 1. Check existing payment
  // ============================================
  const existingPayment = await prisma.payment.findUnique({
    where: {
      vataId: user.vataId,
      id: id as string,
    },
    select: {
      paymentType: true,
      paymentDetails: true,
      quantity: true,
      rate: true,
      totalBill: true,
      cutting: true,
      payment: true,
      paymentDifference: true,
      paymentDate: true,
    },
  });

  if (!existingPayment) {
    throw new AppError(StatusCodes.NOT_FOUND, "পেমেন্ট পাওয়া যায়নি।");
  }

  // ============================================
  // 2. Find ledger
  // ============================================
  const ledger = await prisma.ledger.findFirst({
    where: {
      name: body.ledger,
      vataId: user.vataId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!ledger) {
    throw new AppError(StatusCodes.NOT_FOUND, "খতিয়ান পাওয়া যায়নি।");
  }

  // ============================================
  // 3. Prepare update data
  // ============================================
  const data: any = {
    // ledgerId: ledger.id,
    paymentType: body.paymentType,
    paymentDetails: body.paymentDetails,
    quantity: Number(body.quantity) || 0,
    rate: Number(body.rate) || 0,
    totalBill: Number(body.totalBill) || 0,
    cutting: Number(body.cutting) || 0,
    payment: Number(body.payment) || 0,
    paymentDifference: Number(body.paymentDifference) || 0,
    paymentDate: body.paymentDate,
  };

  if (file?.filename) {
    data.document = file?.filename;
  }

  if (approval) {
    data.document = approval?.document || null;
  }

  // ============================================
  // 5. Update
  // ============================================

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.payment.update({
      where: {
        id: id as string,
        vataId: user.vataId,
      },
      data: {
        ...data,
        updateStatus: "APPROVED",
      },
    });

    await ActivityService.createActivityService({
      action: "UPDATE",
      module: "PAYMENT",
      targetId: id as string,
      userId: user.userId,
      vataId: user.vataId,
      newData: {
        ...data,
        name: ledger.name,
      },
      oldData: {
        ...existingPayment,
        name: ledger.name,
      },
      referenceNumber: ledger?.name,
    });

    return {
      result,
      message: "পেমেন্ট সফলভাবে আপডেট করা হয়েছে।",
    };
  }

  // IF NOT ADMIN
  const result = await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      data: {
        updateStatus: "PENDING",
      },
      where: {
        vataId: user.vataId,
        id: id as string,
      },
    });

    return await tx.approvalRequest.create({
      data: {
        action: "UPDATE",
        module: "PAYMENT",
        targetId: id as string,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        newData: {
          ...data,
          name: ledger.name,
        },
        oldData: {
          ...existingPayment,
          name: ledger.name,
        },
      },
    });
  });

  return {
    result,
    message: "পেমেন্ট আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

// DELETE PAYMENT
const deletePaymentServie = async (user: TAuthUser, id: string) => {
  const existingPayment = await prisma.payment.findUnique({
    where: {
      vataId: user.vataId,
      id: id as string,
    },
    select: {
      paymentType: true,
      paymentDetails: true,
      quantity: true,
      rate: true,
      totalBill: true,
      cutting: true,
      payment: true,
      paymentDifference: true,
      paymentDate: true,
      ledger: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!existingPayment) {
    throw new AppError(StatusCodes.NOT_FOUND, "পেমেন্ট পাওয়া যায়নি।");
  }

  if (user.role === "ADMIN" || user.role === "OWNER") {
    const result = await prisma.payment.update({
      where: { id, vataId: user.vataId },
      data: { isDeleted: true, deleteStatus: "APPROVED" },
    });

    await ActivityService.createActivityService({
      action: "DELETE",
      module: "PAYMENT",
      targetId: id,
      userId: user.userId,
      vataId: user.vataId,
      referenceNumber: existingPayment?.ledger?.name,
    });

    return {
      result,
      message: "পেমেন্টটি সফলভাবে মুছে ফেলা হয়েছে।",
    };
  }

  // OTHER ACTION
  const result = await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      data: {
        deleteStatus: "PENDING",
      },
      where: {
        vataId: user.vataId,
        id,
      },
    });
    const { ledger, ...rest } = existingPayment;
    return await tx.approvalRequest.create({
      data: {
        action: "DELETE",
        module: "PAYMENT",
        targetId: id,
        requestedById: user.userId,
        vataId: user.vataId,
        status: "PENDING",
        oldData: { ...rest, name: ledger?.name },
      },
    });
  });

  return {
    result,
    message: "পেমেন্টটি মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
  };
};

export const PaymentService = {
  createPaymentService,
  getAllPaymentService,
  paymentReportViaGroupService,
  getSinglePaymentService,
  updatePaymentService,
  deletePaymentServie,
};
