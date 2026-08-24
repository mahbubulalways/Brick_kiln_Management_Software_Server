"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const bcryptHelper_1 = require("../../../helpers/bcryptHelper");
// CREATE NEW VATA
const createNewVataService = async (payload) => {
    const vataInformation = payload.vata;
    const ownerInformation = payload.owner;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
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
                throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ভাটা আইডি ইতিমধ্যে ব্যবহার করা হয়েছে");
            }
            if (existVata.subdomain === payload.vata.subdomain) {
                throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই সাবডোমেইন ইতিমধ্যে ব্যবহার করা হয়েছে");
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
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই ইউজারনেম ইতিমধ্যে ব্যবহার করা হয়েছে");
        }
        const hashPassword = await bcryptHelper_1.bcryptHelper.hashPassword(ownerInformation.password);
        const subdomain = vataInformation.nameEnglish.split(" ")[0].toLowerCase();
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
        });
        return vata;
    });
    return result;
};
// CHECK SUB DOMAIN EXIST OR NOT
const checkSubdomainExistService = async (subdomain) => {
    const result = await prisma_1.prisma.vata.findFirst({ where: { subdomain: subdomain } });
    return result;
};
// GET VATA INFO
const getVataInformationService = async (user) => {
    const result = await prisma_1.prisma.vata.findFirst({
        where: { id: user.vataId }, select: {
            nameBangla: true,
            address: true,
            id: true,
            challansPhoneNumber: true,
            ownerName: true
        }
    });
    return result;
};
// GET VATA INFO
const getMyVataInformationService = async (user) => {
    const result = await prisma_1.prisma.vata.findFirst({ where: { id: user.vataId } });
    return result;
};
exports.VataService = {
    createNewVataService,
    checkSubdomainExistService,
    getVataInformationService,
    getMyVataInformationService
};
