import { SubscriptionPlan } from "../../../../generated/prisma/client"
import { prisma } from "../../../../helpers/prisma"

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
    const result = await prisma.subscriptionPlan.findMany({})
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

export const SubscriptionService = {
    createSubscriptionPlanService,
    getAllSubscriptionPlanService,
    getAllSubscriptionPlanOptionsService
}