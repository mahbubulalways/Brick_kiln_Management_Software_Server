import { SubscriptionPlan } from "../../../../generated/prisma/client"
import { prisma } from "../../../../helpers/prisma"
import { TAuthUser } from "../../../../interface/token"
import { TAdminVata } from "../vata/vata.interface"

// CREATE NEW SUBSCRIPTION PLAN
const createSubscriptionPlanService = async (payload: SubscriptionPlan) => {
    const result = await prisma.subscriptionPlan.create({
        data: {
            billingCycle: payload.billingCycle,
            name: payload.name,
            price: Number(payload.price),
            type: payload.type,
            description: payload.description,
            features: payload.features,
            maxInvoices: Number(payload.maxInvoices),
            maxSms: Number(payload.maxSms),
            maxStorage: Number(payload.maxStorage),
            maxTasks: Number(payload.maxTasks),
            maxUsers: Number(payload.maxUsers),
            isActive: payload.isActive,
        }
    })
    return result
}

// GET ALL SUBSCRIPTIONS
const getAllSubscriptionPlanService = async () => {
    const result = await prisma.subscriptionPlan.findMany({ include: { _count: { select: { vatas: true } } } })
    return result
}

// GET PLAN OPTIONS
const getAllSubscriptionPlanOptionsService = async () => {
    const result = await prisma.subscriptionPlan.findMany({
        where: { isActive: true },
        select: {
            id: true,
            name: true
        }
    })
    return result
}

// GET PLAN OPTIONS
const getSingleSubscriptionPlanService = async (id: string) => {
    const result = await prisma.subscriptionPlan.findFirst({
        where: { id }
    })
    return result
}

// UPDATE
const updateSubscriptionPlanService = async (
    id: string,
    payload: SubscriptionPlan
) => {
    const result = await prisma.subscriptionPlan.update({
        where: {
            id,
        },
        data: {
            billingCycle: payload.billingCycle,
            name: payload.name,
            price: Number(payload.price),
            type: payload.type,
            description: payload.description,
            features: payload.features,

            maxInvoices: payload.maxInvoices ?? null,
            maxSms: payload.maxSms ?? null,
            maxStorage: payload.maxStorage ?? null,
            maxTasks: payload.maxTasks ?? null,
            maxUsers: payload.maxUsers ?? null,

            isActive: payload.isActive,
        },
    });

    return result;
};

// GET VATA SUBSCRIPTION
const getSingleVataSubscriptionService = async (id: string) => {
    const result = await prisma.vata.findFirst({
        where: {
            id
        },
        select: {
            subscriptionPlan: {
                select: {
                    name: true,
                    id: true
                }
            }
        }
    })

    return result
}


export const SubscriptionService = {
    createSubscriptionPlanService,
    getAllSubscriptionPlanService,
    getAllSubscriptionPlanOptionsService,
    getSingleSubscriptionPlanService,
    updateSubscriptionPlanService,
    getSingleVataSubscriptionService
}