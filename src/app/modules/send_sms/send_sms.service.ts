import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

const getVatasSendMessageService = async (user: TAuthUser) => {
  const result = await prisma.smsLog.findMany({
    where: { vataId: user.vataId },
  });
  return result;
};

export const SendSmsService = {
  getVatasSendMessageService,
};
