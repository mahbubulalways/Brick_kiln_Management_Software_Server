import { StatusCodes } from "http-status-codes"
import { Prisma } from "../../../generated/prisma/client"
import { prisma } from "../../../helpers/prisma"
import { AppError } from "../../errors/ApplicationError"
import { TVata } from "./vata.interface"
import { bcryptHelper } from "../../../helpers/bcryptHelper"
import { TAuthUser } from "../../../interface/token"



// CHECK SUB DOMAIN EXIST OR NOT
const checkSubdomainExistService = async (subdomain: string) => {
    const result = await prisma.vata.findFirst({ where: { subdomain: subdomain } })
    return result
}


// GET VATA INFO
const getVataInformationService = async (user: TAuthUser) => {
    const result = await prisma.vata.findFirst({
        where: { id: user.vataId }, select: {
            nameBangla: true,
            address: true,
            id: true,
            challansPhoneNumber: true,
            ownerName:true
        }
    })
    return result
}


// GET VATA INFO
const getMyVataInformationService = async (user: TAuthUser) => {
    const result = await prisma.vata.findFirst({ where: { id: user.vataId } })
    return result
}


export const VataService = {
    checkSubdomainExistService,
    getVataInformationService,
    getMyVataInformationService
}