"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendSmsService = void 0;
const prisma_1 = require("../../../helpers/prisma");
// import { sendSmsToPhoneNumbers } from "../../service/sendSmsToPhoneNumbers";
const getVatasSendMessageService = async (user) => {
    const result = await prisma_1.prisma.smsLog.findMany({
        where: { vataId: user.vataId },
    });
    return result;
};
const sendMessageToUserService = async () => {
    // const result = await sendSmsToPhoneNumbers(["01407128177"], "Hello Check");
    return "HEEEEEEEEo";
};
exports.SendSmsService = {
    getVatasSendMessageService,
    sendMessageToUserService,
};
