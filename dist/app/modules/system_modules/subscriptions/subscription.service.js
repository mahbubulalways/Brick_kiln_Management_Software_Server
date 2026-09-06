"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const prisma_1 = require("../../../../helpers/prisma");
// CREATE NEW SUBSCRIPTION PLAN
const createSubscriptionPlanService = async (payload) => {
    const result = await prisma_1.prisma.subscriptionPlan.create({
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
    });
    return result;
};
// GET ALL SUBSCRIPTIONS
const getAllSubscriptionPlanService = async () => {
    const result = await prisma_1.prisma.subscriptionPlan.findMany({ include: { _count: { select: { vatas: true } } } });
    return result;
};
// GET PLAN OPTIONS
const getAllSubscriptionPlanOptionsService = async () => {
    const result = await prisma_1.prisma.subscriptionPlan.findMany({
        where: { isActive: true },
        select: {
            id: true,
            name: true
        }
    });
    return result;
};
// GET PLAN OPTIONS
const getSingleSubscriptionPlanService = async (id) => {
    const result = await prisma_1.prisma.subscriptionPlan.findFirst({
        where: { id }
    });
    return result;
};
// UPDATE
const updateSubscriptionPlanService = async (id, payload) => {
    const result = await prisma_1.prisma.subscriptionPlan.update({
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
const getSingleVataSubscriptionService = async (id) => {
    const result = await prisma_1.prisma.vata.findFirst({
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
    });
    return result;
};
exports.SubscriptionService = {
    createSubscriptionPlanService,
    getAllSubscriptionPlanService,
    getAllSubscriptionPlanOptionsService,
    getSingleSubscriptionPlanService,
    updateSubscriptionPlanService,
    getSingleVataSubscriptionService
};
