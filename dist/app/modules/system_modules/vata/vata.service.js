"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVataService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../../helpers/prisma");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const bcryptHelper_1 = require("../../../../helpers/bcryptHelper");
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
// GET ALL VATA
const getAllVataService = async () => {
    const result = await prisma_1.prisma.vata.findMany({
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
    });
    return result;
};
// GET ALL INACTIVE VATA
const getAllInactiveVataService = async () => {
    const result = await prisma_1.prisma.vata.findMany({
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
    });
    return result;
};
// GET SINGLE VATA
const getSingleVataService = async (id) => {
    const result = await prisma_1.prisma.vata.findFirst({
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
    });
    return result;
};
exports.AdminVataService = {
    createNewVataService,
    getAllVataService,
    getSingleVataService,
    getAllInactiveVataService
};
