"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataSmsSettingsService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const createOrUpdateVataSmsSettings = async (user, payload) => {
    payload.vataId = user.vataId;
    const result = await prisma_1.prisma.vataSmsSettings.upsert({
        where: {
            vataId: user.vataId,
        },
        create: {
            ...payload,
        },
        update: {
            ...payload,
        },
    });
    return result;
};
// GET VATA SMS SETTINGS
const getVataSmsSettingService = async (user) => {
    const result = await prisma_1.prisma.vataSmsSettings.findFirst({
        where: { vataId: user.vataId },
    });
    return result;
};
exports.VataSmsSettingsService = {
    createOrUpdateVataSmsSettings,
    getVataSmsSettingService,
};
