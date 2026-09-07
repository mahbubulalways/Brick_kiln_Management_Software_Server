"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSmsService = void 0;
const prisma_1 = require("../../../helpers/prisma");
const getVatasSendMessageService = async (user) => {
    const result = await prisma_1.prisma.smsLog.findMany({
        where: { vataId: user.vataId },
    });
    return result;
};
exports.SendSmsService = {
    getVatasSendMessageService,
};
