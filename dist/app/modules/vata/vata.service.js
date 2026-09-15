"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
// CHECK SUB DOMAIN EXIST OR NOT
const checkSubdomainExistService = async (subdomain) => {
    const result = await prisma_1.prisma.vata.findFirst({
        where: { subdomain: subdomain },
    });
    return result;
};
// GET VATA INFO
const getVataInformationService = async (user) => {
    const result = await prisma_1.prisma.vata.findFirst({
        where: { id: user.vataId },
        select: {
            nameBangla: true,
            address: true,
            id: true,
            ownerName: true,
            ownerPhoneNumber: true,
            challanManagerPhoneNumber: true,
            challanPersonOneName: true,
            challanPersonOnePhoneNumber: true,
            additionalAddress: true,
            challanPersonTwoName: true,
            challanPersonTwoPhoneNumber: true,
            shortDescription: true,
            shortForm: true,
        },
    });
    return result;
};
// GET VATA INFO
const getMyVataInformationService = async (user) => {
    const result = await prisma_1.prisma.vata.findFirst({
        where: { id: user.vataId },
        select: {
            address: true,
            ownerName: true,
            vataId: true,
            challanManagerPhoneNumber: true,
            challanPersonOneName: true,
            challanPersonOnePhoneNumber: true,
            additionalAddress: true,
            challanPersonTwoName: true,
            challanPersonTwoPhoneNumber: true,
            shortDescription: true,
            shortForm: true,
            ownerPhoneNumber: true,
            nameBangla: true,
            nameEnglish: true,
            nextPaymentDate: true,
            subscriptionPlan: {
                select: {
                    name: true,
                    billingCycle: true,
                    price: true,
                },
            },
        },
    });
    return result;
};
// GET MY NAVBAR
const getMyVataNavbarFeaturesService = async (user) => {
    const result = await prisma_1.prisma.vata.findFirst({
        where: {
            id: user.vataId,
        },
        select: {
            id: true,
            subscriptionPlan: {
                select: {
                    features: true,
                },
            },
        },
    });
    return result;
};
// CHECK VATA EXPIRITY
const getVataExpirityService = async (user) => {
    const result = await prisma_1.prisma.vata.findFirst({
        where: {
            id: user.vataId,
        },
        select: {
            subscriptionEnd: true,
        },
    });
    if (!result) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ভাটা পাওয়া যায়নি");
    }
    if (!result.subscriptionEnd) {
        return {
            isExpired: true,
        };
    }
    const isExpired = new Date(result.subscriptionEnd).getTime() < Date.now();
    return {
        isExpired,
    };
};
exports.VataService = {
    checkSubdomainExistService,
    getVataInformationService,
    getMyVataInformationService,
    getMyVataNavbarFeaturesService,
    getVataExpirityService,
};
