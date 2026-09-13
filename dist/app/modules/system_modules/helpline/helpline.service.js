"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpLineService = void 0;
const prisma_1 = require("../../../../helpers/prisma");
const createOrUpdateHelplineService = async (payload) => {
    const existingHelpline = await prisma_1.prisma.helpLine.findFirst();
    if (existingHelpline) {
        return await prisma_1.prisma.helpLine.update({
            where: {
                id: existingHelpline.id,
            },
            data: payload,
        });
    }
    return await prisma_1.prisma.helpLine.create({
        data: payload,
    });
};
const getHelplineService = async () => {
    const result = await prisma_1.prisma.helpLine.findFirst();
    return result;
};
exports.HelpLineService = {
    createOrUpdateHelplineService,
    getHelplineService,
};
