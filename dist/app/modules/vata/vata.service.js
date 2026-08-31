"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataService = void 0;
const prisma_1 = require("../../../helpers/prisma");
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
    checkSubdomainExistService,
    getVataInformationService,
    getMyVataInformationService
};
