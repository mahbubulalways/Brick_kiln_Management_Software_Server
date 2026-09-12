import { HelpLine } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";

const createOrUpdateHelplineService = async (payload: HelpLine) => {
  const existingHelpline = await prisma.helpLine.findFirst();
  if (existingHelpline) {
    return await prisma.helpLine.update({
      where: {
        id: existingHelpline.id,
      },
      data: payload,
    });
  }
  return await prisma.helpLine.create({
    data: payload,
  });
};

const getHelplineService = async () => {
  const result = await prisma.helpLine.findFirst();
  return result;
};

export const HelpLineService = {
  createOrUpdateHelplineService,
  getHelplineService,
};
