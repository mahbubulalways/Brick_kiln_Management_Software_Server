import { SmsSetting } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";

// CREATE UPDATE RATE
const createOrUpdateSmsRateService = async (payload: SmsSetting) => {
  const existingSetting = await prisma.smsSetting.findFirst();
  if (existingSetting) {
    return await prisma.smsSetting.update({
      where: {
        id: existingSetting.id,
      },
      data: {
        ...payload,
      },
    });
  }

  return await prisma.smsSetting.create({
    data: {
      ...payload,
    },
  });
};

// GET SMS
const getSmsRateService = async () => {
  const smsSetting = await prisma.smsSetting.findFirst();
  return smsSetting;
};

export const SmsRateService = {
  createOrUpdateSmsRateService,
  getSmsRateService,
};
