import { VataSmsSettings } from "../../../generated/prisma/client";
import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

const createOrUpdateVataSmsSettings = async (
  user: TAuthUser,
  payload: VataSmsSettings,
) => {
  payload.vataId = user.vataId;
  const result = await prisma.vataSmsSettings.upsert({
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
const getVataSmsSettingService = async (user: TAuthUser) => {
  const result = await prisma.vataSmsSettings.findFirst({
    where: { vataId: user.vataId },
  });
  return result;
};

export const VataSmsSettingsService = {
  createOrUpdateVataSmsSettings,
  getVataSmsSettingService,
};
