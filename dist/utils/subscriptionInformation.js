"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = subscriptionInformation;
const prisma_1 = require("../helpers/prisma");
async function subscriptionInformation(vataId) {
    const result = await prisma_1.prisma.vata.findFirst({
        where: { id: vataId }, select: {
            subscriptionPlan: {
                select: {
                    maxInvoices: true,
                    maxSms: true,
                    maxStorage: true,
                    maxTasks: true,
                    maxUsers: true,
                }
            }
        }
    });
    return result;
}
