import { AboutUs } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";

const createAboutUsService = async (payload: AboutUs) => {
  const existingAboutUs = await prisma.aboutUs.findFirst();

  if (existingAboutUs) {
    const result = await prisma.aboutUs.update({
      where: {
        id: existingAboutUs.id,
      },
      data: payload,
    });

    return result;
  }

  const result = await prisma.aboutUs.create({
    data: payload,
  });

  return result;
};

const getAboutUsService = async () => {
  const result = await prisma.aboutUs.findFirst();
  return result;
};

export const AboutUsService = {
  createAboutUsService,
  getAboutUsService,
};
