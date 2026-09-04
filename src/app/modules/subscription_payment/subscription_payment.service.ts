import { StatusCodes } from "http-status-codes";
import { SubscriptionPayment, SubscriptionPaymentStatus } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import { AppError } from "../../errors/ApplicationError";

const createNewSubscriptionPaymentService = async (
    user: TAuthUser,
    payload: SubscriptionPayment
) => {
    const findSubscription = await prisma.vata.findFirst({
        where: {
            id: user.vataId,
        },
        select: {
            subscriptionPlan: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!findSubscription?.subscriptionPlan) {
        throw new AppError(
            StatusCodes.NOT_FOUND,
            "ভাটার কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।"
        );
    }
    const subscription = findSubscription.subscriptionPlan;
    const result = await prisma.subscriptionPayment.create({
        data: {
            amount: payload.amount,
            paymentMethod: payload.paymentMethod,
            phoneNumber: payload.phoneNumber,
            transactionId: payload.transactionId,
            paidAt: new Date(),
            status: "PENDING",
            vataId: user.vataId,
            subscriptionPlanId: subscription.id,
        },
    });

    return result;
};

// GET ALL PENDING FOR SYSTEM ADMIN
const getAllSubscriptionPaymentService = async (
) => {
    const result = await prisma.subscriptionPayment.findMany({
        where: {
            status: "PENDING",
        },
        include: {
            subscriptionPlan: {
                select: {
                    name: true,
                    price: true
                }
            },
            vata: {
                select: {
                    nameEnglish: true,
                    vataId: true
                }
            }
        }
    })
    return result;
};


// GET ALL PAID FOR SYSTEM ADMIN
const getAllPaidSubscriptionService = async (
) => {
    const result = await prisma.subscriptionPayment.findMany({
        where: {
            status: "PAID"
        }
    })
    return result;
};

// GET OTHER FOR SYSTEM ADMIN
const getOtherSubscriptionService = async () => {
    const result = await prisma.subscriptionPayment.findMany({
        where: {
            NOT: {
                OR: [
                    {
                        status: "PENDING",
                    }
                ],
            },
        },
        include: {
            subscriptionPlan: {
                select: {
                    name: true,
                    price: true
                }
            },
            vata: {
                select: {
                    nameEnglish: true,
                    vataId: true
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    });

    return result;
};


// GET VATA HISTORY
const getVataSubscriptionPaymentHistoryService = async (user: TAuthUser) => {
    const result = await prisma.subscriptionPayment.findMany({
        where: {
            vataId: user.vataId
        },
        include: {
            subscriptionPlan: {
                select: {
                    price: true,

                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return result;
};


// UPDATE SUSBCRIPTION PAYMENT
const updateSubscriptionPaymnentStatus = async (
    id: string,
    payload: { status: SubscriptionPaymentStatus }
) => {
    return await prisma.$transaction(async (tx) => {
        // Payment + Subscription Plan বের করা
        const payment = await tx.subscriptionPayment.findUnique({
            where: {
                id,
            },
            include: {
                subscriptionPlan: {
                    select: {
                        billingCycle: true,
                    },
                },
            },
        });

        if (!payment) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "সাবস্ক্রিপশন পেমেন্টটি পাওয়া যায়নি।"
            );
        }

        if (!payment.subscriptionPlan) {
            throw new AppError(
                StatusCodes.NOT_FOUND,
                "এই পেমেন্টের কোনো সাবস্ক্রিপশন প্ল্যান পাওয়া যায়নি।"
            );
        }

        // CANCELLED হলে শুধু payment status update হবে
        if (payload.status === "CANCELLED") {
            return await tx.subscriptionPayment.update({
                where: {
                    id,
                },
                data: {
                    status: "CANCELLED",
                },
            });
        }

        // PAID হলে Start & End Date তৈরি
        const startDate = new Date();
        const endDate = new Date(startDate);

        if (payment.subscriptionPlan.billingCycle === "MONTHLY") {
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (
            payment.subscriptionPlan.billingCycle === "YEARLY"
        ) {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
            throw new AppError(
                StatusCodes.BAD_REQUEST,
                "সাবস্ক্রিপশনের বিলিং সাইকেল সঠিক নয়।"
            );
        }

        // Payment PAID
        const result = await tx.subscriptionPayment.update({
            where: {
                id,
            },
            data: {
                status: "PAID",
                startDate,
                endDate,
                paidAt: new Date(),
            },
        });

        // Vata Subscription Update
        await tx.vata.update({
            where: {
                id: payment.vataId,
            },
            data: {
                subscriptionPlanId: payment.subscriptionPlanId,
                subscriptionStart: startDate,
                subscriptionEnd: endDate,
                nextPaymentDate: endDate,
            },
        });

        return result;
    });
};

export const SubscriptionPaymentService = {
    createNewSubscriptionPaymentService,
    getAllSubscriptionPaymentService,
    getAllPaidSubscriptionService,
    getOtherSubscriptionService,
    getVataSubscriptionPaymentHistoryService,
    updateSubscriptionPaymnentStatus
}