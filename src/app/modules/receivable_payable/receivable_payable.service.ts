import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";

// ==========================================
// Create Receivable / Payable
// ==========================================
const createReceivablePayable = async (
    payload: Prisma.ReceivablePayableCreateInput
) => {
    const result = await prisma.receivablePayable.create({
        data: {
            ...payload,
            currentAmount: payload.amount,
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
    id: string,
    payload: Prisma.ReceivablePayableTransactionCreateWithoutReceivablePayableInput
) => {
    return await prisma.$transaction(async (tx) => {
        const main = await tx.receivablePayable.findUnique({
            where: {
                id,
                isDeleted: false,
            },
        });

        if (!main) {
            throw new Error("লেনদেনের হিসাব পাওয়া যায়নি");
        }

        let currentAmount = Number(main.currentAmount);

        if (main.transactionType === "GIVEN") {
            if (payload.type === "GIVEN") {
                currentAmount += Number(payload.amount);
            } else {
                currentAmount -= Number(payload.amount);
            }
        } else {
            if (payload.type === "TAKEN") {
                currentAmount += Number(payload.amount);
            } else {
                currentAmount -= Number(payload.amount);
            }
        }

        if (currentAmount < 0) {
            throw new Error(
                "লেনদেনের পর অবশিষ্ট টাকা শূন্যের কম হতে পারবে না"
            );
        }

        const transaction =
            await tx.receivablePayableTransaction.create({
                data: {
                    ...payload,
                    receivablePayable: {
                        connect: {
                            id,
                        },
                    },
                },
            });

        const updatedMain =
            await tx.receivablePayable.update({
                where: {
                    id,
                },
                data: {
                    currentAmount,
                },
                include: {
                    transactions: {
                        orderBy: {
                            transactionDate: "desc",
                        },
                    },
                },
            });

        return {
            transaction,
            data: updatedMain,
        };
    });
};


// ==========================================
// Get All Receivable / Payable
// ==========================================
const getAllReceivablePayable = async () => {
    const result = await prisma.receivablePayable.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            createdAt: "desc",
        },
        select:{
            name:true,
            id:true,
            address:true,
            amount:true,
            currentAmount:true,
            transactionType:true
        }
    });

    return result;
};


// ==========================================
// Get Single Receivable / Payable
// ==========================================
const getSingleReceivablePayable = async (id: string) => {
    const result = await prisma.receivablePayable.findFirst({
        where: {
            id,
            isDeleted: false,
        },
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
// Update Receivable / Payable
// ==========================================
const updateReceivablePayable = async (
    id: string,
    payload: Prisma.ReceivablePayableUpdateInput
) => {
    const result = await prisma.receivablePayable.update({
        where: {
            id,
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
const deleteReceivablePayable = async (id: string) => {
    const result = await prisma.receivablePayable.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });

    return result;
};


export const ReceivablePayableService = {
    createReceivablePayable,
    createTransaction,
    getAllReceivablePayable,
    getSingleReceivablePayable,
    updateReceivablePayable,
    deleteReceivablePayable,
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
