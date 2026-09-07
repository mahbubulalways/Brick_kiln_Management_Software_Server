"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsRateService = void 0;
const prisma_1 = require("../../../../helpers/prisma");
// CREATE UPDATE RATE
const createOrUpdateSmsRateService = async (payload) => {
    const existingSetting = await prisma_1.prisma.smsSetting.findFirst();
    if (existingSetting) {
        return await prisma_1.prisma.smsSetting.update({
            where: {
                id: existingSetting.id,
            },
            data: {
                ...payload,
            },
        });
    }
    return await prisma_1.prisma.smsSetting.create({
        data: {
            ...payload,
        },
    });
};
// GET SMS
const getSmsRateService = async () => {
    const smsSetting = await prisma_1.prisma.smsSetting.findFirst();
    return smsSetting;
};
exports.SmsRateService = {
    createOrUpdateSmsRateService,
    getSmsRateService,
};
