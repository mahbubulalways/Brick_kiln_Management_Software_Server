import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";
import { AppError } from "../../../errors/ApplicationError";
import { TAdminVata } from "./vata.interface";
import { bcryptHelper } from "../../../../helpers/bcryptHelper";

// CREATE NEW VATA
const createNewVataService = async (payload: TAdminVata) => {
    const vataInformation = payload.vata
    const ownerInformation = payload.owner
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const existVata = await tx.vata.findFirst({
            where: {
                OR: [
                    { vataId: payload.vata.vataId },
                    { subdomain: payload.vata.subdomain },
                ],
            },
            select: {
                vataId: true,
                subdomain: true,
            },
        });

        if (existVata) {
            if (existVata.vataId === payload.vata.vataId) {
                throw new AppError(
                    StatusCodes.CONFLICT,
                    "এই ভাটা আইডি ইতিমধ্যে ব্যবহার করা হয়েছে"
                );
            }

            if (existVata.subdomain === payload.vata.subdomain) {
                throw new AppError(
                    StatusCodes.CONFLICT,
                    "এই সাবডোমেইন ইতিমধ্যে ব্যবহার করা হয়েছে"
                );
            }
        }
        const existUser = await tx.user.findFirst({
            where: {
                username: payload.owner.username,
            },
            select: {
                id: true,
            },
        });

        if (existUser?.id) {
            throw new AppError(
                StatusCodes.CONFLICT,
                "এই ইউজারনেম ইতিমধ্যে ব্যবহার করা হয়েছে"
            );
        }
        const hashPassword = await bcryptHelper.hashPassword(ownerInformation.password)
        const subdomain = vataInformation.nameEnglish.split(" ")[0].toLowerCase()
        const vata = await tx.vata.create({
            data: {
                vataId: vataInformation.vataId,
                nameEnglish: vataInformation.nameEnglish,
                nameBangla: vataInformation.nameBangla,
                address: vataInformation.address,
                ownerName: vataInformation.ownerName,
                ownerPhoneNumber: vataInformation.ownerPhoneNumber,
                challansPhoneNumber: vataInformation.challansPhoneNumber,
                smsRate: Number(vataInformation.smsRate),
                softwareFee: Number(vataInformation.softwareFee),
                nextPaymentDate: new Date(vataInformation.nextPaymentDate),
                subdomain: vataInformation.subdomain || subdomain,
                subscriptionEnd: payload.vata.nextPaymentDate,
                subscriptionStart: new Date()

            },
        });

        await tx.subscription.create({
            data: {
                amount: payload.vata.softwareFee,
                paymentMethod: "1st",
                phoneNumber: "1st",
                transactionId: "1st",
                startDate: new Date(),
                paidAt: new Date(),
                endDate: payload.vata.nextPaymentDate,
                status: "PAID",
                vataId: vata.id
            }
        })

        await tx.user.create({
            data: {
                password: hashPassword,
                username: ownerInformation.username,
                name: ownerInformation.name,
                role: "OWNER",
                vataId: vata.id
            }
        })
        return vata

    })

    return result
}



// GET ALL VATA
const getAllVataService = async () => {
    const result = await prisma.vata.findMany({
        where: {
            status: "ACTIVE"
        },
        select: {
            vataId: true,
            id: true,
            nameBangla: true,
            nameEnglish: true,
            nextPaymentDate: true,
            ownerName: true,
            address: true,
            createdAt: true,
            softwareFee: true,
        }
    })
    return result
}

// GET ALL INACTIVE VATA
const getAllInactiveVataService = async () => {
    const result = await prisma.vata.findMany({
        where: {
            status: {
                not: "ACTIVE"
            }
        },
        select: {
            vataId: true,
            id: true,
            nameBangla: true,
            nameEnglish: true,
            nextPaymentDate: true,
            ownerName: true,
            address: true,
            createdAt: true,
            softwareFee: true,
        }
    })
    return result
}

// GET SINGLE VATA
const getSingleVataService = async (id: string) => {
    const result = await prisma.vata.findFirst({
        where: { id, },
        select: {
            vataId: true,
            id: true,
            nameBangla: true,
            nameEnglish: true,
            nextPaymentDate: true,
            ownerName: true,
            address: true,
            createdAt: true,
            softwareFee: true,
            smsRate: true,
            subscriptionEnd: true,
            subscriptionStart: true,
            subdomain: true,
            subscriptions: true,
            ownerPhoneNumber: true
        }
    })
    return result
}

export const AdminVataService = {
    createNewVataService,
    getAllVataService,
    getSingleVataService,
    getAllInactiveVataService
}