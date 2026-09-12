"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqService = void 0;
const prisma_1 = require("../../../../helpers/prisma");
const crateFaqService = async (payload) => {
    const result = await prisma_1.prisma.faq.create({
        data: payload,
    });
    return result;
};
const getFaqService = async () => {
    const result = await prisma_1.prisma.faq.findMany({ orderBy: { createdAt: "asc" } });
    return result;
};
const updateFaqService = async (id, payload) => {
    const result = await prisma_1.prisma.faq.update({ data: payload, where: { id } });
    return result;
};
exports.FaqService = { crateFaqService, getFaqService, updateFaqService };
