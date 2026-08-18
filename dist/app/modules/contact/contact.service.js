"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const createContactService = async (payload) => {
    const result = await prisma_1.prisma.contact.create({
        data: {
            name: payload.name,
            address: payload.address,
            occupation: payload.occupation,
            phone: payload.phone,
        },
    });
    return result;
};
const getAllContactService = async (query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {};
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                address: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                phone: {
                    contains: search,
                    mode: "insensitive",
                },
            }
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.contact.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.contact.count({ where })
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit: limit,
        page: page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
const getSingleContactService = async (id) => {
    const result = await prisma_1.prisma.contact.findUnique({
        where: {
            id,
        },
    });
    return result;
};
const updateContactService = async (id, payload) => {
    const result = await prisma_1.prisma.contact.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
};
const deleteContactService = async (id) => {
    const result = await prisma_1.prisma.contact.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.ContactService = {
    createContactService,
    getAllContactService,
    getSingleContactService,
    updateContactService,
    deleteContactService,
};
