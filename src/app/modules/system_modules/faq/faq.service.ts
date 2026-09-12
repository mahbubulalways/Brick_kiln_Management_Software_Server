import { Faq } from "../../../../generated/prisma/client";
import { prisma } from "../../../../helpers/prisma";

const crateFaqService = async (payload: Faq) => {
  const result = await prisma.faq.create({
    data: payload,
  });
  return result;
};

const getFaqService = async () => {
  const result = await prisma.faq.findMany({ orderBy: { createdAt: "asc" } });
  return result;
};

const updateFaqService = async (id: string, payload: Faq) => {
  const result = await prisma.faq.update({ data: payload, where: { id } });
  return result;
};

export const FaqService = { crateFaqService, getFaqService, updateFaqService };
