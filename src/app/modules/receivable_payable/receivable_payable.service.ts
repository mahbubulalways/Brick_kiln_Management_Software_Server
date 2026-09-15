import { Prisma, ReceivablePayable } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

// ==========================================
// Create Receivable / Payable
// ==========================================
const createReceivablePayable = async (
  user: TAuthUser,
  payload: ReceivablePayable,
) => {
  const result = await prisma.receivablePayable.create({
    data: {
      ...payload,
      vataId: user.vataId,
      currentAmount: Number(payload.amount),
    },
    include: {
      transactions: true,
    },
  });

  return result;
};

// ==========================================
// Create Transaction
// ==========================================
const createTransaction = async (
  user: TAuthUser,
  id: string,
  payload: Prisma.ReceivablePayableTransactionCreateWithoutReceivablePayableInput,
) => {
  const result = await prisma.$transaction(async (tx) => {
    const parent = await tx.receivablePayable.findFirst({
      where: {
        id,
        vataId: user.vataId,
      },
      select: {
        amount: true,
        currentAmount: true,
      },
    });

    const data = {
      receivablePayableId: id,
      type: payload.type,
      amount: Number(payload.amount),
      transactionDate: payload.transactionDate,
      description: payload.description,
      remaining: 0,
      vataId: user.vataId,
    };

    if (payload.type === "GIVEN") {
      const currentAmount = Number(parent?.currentAmount) + data.amount;
      const totalAmount = Number(parent?.amount) + data.amount;
      data.remaining = currentAmount;
      const transaction = await tx.receivablePayableTransaction.create({
        data,
      });
      await tx.receivablePayable.update({
        where: { id, vataId: user.vataId },
        data: {
          currentAmount,
          amount: totalAmount,
          paymentDate: data.transactionDate,
        },
      });

      return transaction;
    } else if (payload.type === "TAKEN") {
      const currentAmount = Number(parent?.currentAmount) + data.amount;
      const totalAmount = Number(parent?.amount) + data.amount;
      data.remaining = currentAmount;
      const transaction = await tx.receivablePayableTransaction.create({
        data,
      });
      await tx.receivablePayable.update({
        where: { id, vataId: user.vataId },
        data: {
          currentAmount,
          amount: totalAmount,
          paymentDate: data.transactionDate,
        },
      });
      return transaction;
    } else {
      const currentAmount = Number(parent?.currentAmount) - data.amount;
      data.remaining = currentAmount;
      const transaction = await tx.receivablePayableTransaction.create({
        data,
      });
      await tx.receivablePayable.update({
        where: { id, vataId: user.vataId },
        data: {
          currentAmount,
          paymentDate: data.transactionDate,
        },
      });
      return transaction;
    }
  });

  return result;
};

// ==========================================
// Get All Receivable / Payable
// ==========================================
const getAllReceivablePayable = async (user: TAuthUser) => {
  const result = await prisma.receivablePayable.findMany({
    where: {
      isDeleted: false,
      vataId: user.vataId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      name: true,
      id: true,
      address: true,
      amount: true,
      currentAmount: true,
      transactionType: true,
    },
  });

  return result;
};

// ==========================================
// Get Single Receivable / Payable
// ==========================================
const getSingleReceivablePayable = async (user: TAuthUser, id: string) => {
  const result = await prisma.receivablePayable.findFirst({
    where: {
      id,
      isDeleted: false,
      vataId: user.vataId,
    },
    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return result;
};

// ==========================================
// Update Receivable / Payable
// ==========================================
const updateReceivablePayable = async (
  user: TAuthUser,
  id: string,
  payload: Prisma.ReceivablePayableUpdateInput,
) => {
  const result = await prisma.receivablePayable.update({
    where: {
      id,
      vataId: user.vataId,
    },
    data: payload,
    include: {
      transactions: {
        orderBy: {
          transactionDate: "desc",
        },
      },
    },
  });

  return result;
};

// ==========================================
// Delete Receivable / Payable
// ==========================================
const deleteReceivablePayable = async (user: TAuthUser, id: string) => {
  const result = await prisma.receivablePayable.update({
    where: {
      id,
      vataId: user.vataId,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

// GET AMOUNT VIA GIVEN TAKEN
const getCurrentAmountService = async (user: TAuthUser, id: string) => {
  const result = await prisma.receivablePayable.findFirst({
    where: { id, vataId: user.vataId },
    select: { currentAmount: true, id: true },
  });
  return result;
};

// GET ALL TRANSACTION HISTORY

export const ReceivablePayableService = {
  createReceivablePayable,
  createTransaction,
  getAllReceivablePayable,
  getSingleReceivablePayable,
  updateReceivablePayable,
  deleteReceivablePayable,
  getCurrentAmountService,
};

// const getAllGivenService = async () => {
//     const result = await prisma.receivablePayable.findMany({
//         where: {
//             isDeleted: false,
//             transactionType: "GIVEN",
//         },
//         orderBy: {
//             createdAt: "desc",
//         },
//         // include: {
//         //     transactions: {
//         //         orderBy: {
//         //             transactionDate: "desc",
//         //         },
//         //     },
//         // },
//     });

//     return result;
// };

// // ==========================================
// // Get All TAKEN (Payable)
// // ==========================================
// const getAllTakenService = async () => {
//     const result = await prisma.receivablePayable.findMany({
//         where: {
//             isDeleted: false,
//             transactionType: "TAKEN",
//         },
//         orderBy: {
//             createdAt: "desc",
//         },
//         include: {
//             transactions: {
//                 orderBy: {
//                     transactionDate: "desc",
//                 },
//             },
//         },
//     });

//     return result;
// };
