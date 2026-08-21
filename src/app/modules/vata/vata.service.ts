import { StatusCodes } from "http-status-codes"
import { Prisma } from "../../../generated/prisma/client"
import { prisma } from "../../../helpers/prisma"
import { AppError } from "../../errors/ApplicationError"
import { TVata } from "./vata.interface"
import { bcryptHelper } from "../../../helpers/bcryptHelper"
import { TAuthUser } from "../../../interface/token"

// CREATE NEW VATA
const createNewVataService = async (payload: TVata) => {
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
                subdomain: vataInformation.subdomain || subdomain
            },
        });
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

// CHECK SUB DOMAIN EXIST OR NOT
const checkSubdomainExistService = async (subdomain: string) => {
    const result = await prisma.vata.findFirst({ where: { subdomain: subdomain } })
    return result
}


// GET VATA INFO
const getVataInformationService = async (user: TAuthUser) => {
    const result = await prisma.vata.findFirst({ where: { id: user.vataId },select:{
        nameBangla:true,
        address:true,
        id:true,
        challansPhoneNumber:true,
    } })
    return result
}


export const VataService = {
    createNewVataService,
    checkSubdomainExistService,
    getVataInformationService
}