"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUsService = void 0;
const prisma_1 = require("../../../../helpers/prisma");
const createAboutUsService = async (payload) => {
    const existingAboutUs = await prisma_1.prisma.aboutUs.findFirst();
    if (existingAboutUs) {
        const result = await prisma_1.prisma.aboutUs.update({
            where: {
                id: existingAboutUs.id,
            },
            data: payload,
        });
        return result;
    }
    const result = await prisma_1.prisma.aboutUs.create({
        data: payload,
    });
    return result;
};
const getAboutUsService = async () => {
    const result = await prisma_1.prisma.aboutUs.findFirst();
    return result;
};
exports.AboutUsService = {
    createAboutUsService,
    getAboutUsService,
};
