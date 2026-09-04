import { prisma } from "../helpers/prisma";

export default async function subscriptionInformation(vataId: string) {
    const result = await prisma.vata.findFirst({
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
    })
    return result
}
