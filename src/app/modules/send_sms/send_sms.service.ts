import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";
import { sendSmsToPhoneNumbers } from "../../../utils/sendSmsToPhoneNumbers";

const getVatasSendMessageService = async (user: TAuthUser) => {
  const result = await prisma.smsLog.findMany({
    where: { vataId: user.vataId },
  });
  return result;
};

const sendMessageToUserService = async () => {
  const result = await sendSmsToPhoneNumbers(["01407128177"], "Hello Check");
  return "HEEEEEEEEo";
};

export const SendSmsService = {
  getVatasSendMessageService,
  sendMessageToUserService,
};
