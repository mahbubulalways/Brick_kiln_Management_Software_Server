import { Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { prisma } from "../../../helpers/prisma";
import { TQuery } from "../../../interface/query";
import { TAuthUser } from "../../../interface/token";
import { createMetaConfig } from "../../../utils/createMetaConfig";


const createContactService = async (user: TAuthUser, payload: {
    name: string;
    address: string;
    occupation: string;
    phone: string;
}) => {
    const result = await prisma.contact.create({
        data: {
            name: payload.name,
            address: payload.address,
            occupation: payload.occupation,
            phone: payload.phone,
            vataId: user.vataId
        },
    });

    return result;
};

const getAllContactService = async (user: TAuthUser, query: TQuery) => {
    const { limit, page, skip } = paginationHelper(query.page, query.limit);
    const where: Prisma.ContactWhereInput = { vataId: user.vataId };
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
        prisma.contact.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit
        }),
        prisma.contact.count({ where })

    ]);

    const meta = createMetaConfig({
        limit: limit,
        page: page,
        totalData: total,
    });

    return {
        meta,
        data: result,
    };
};

const getSingleContactService = async (user: TAuthUser, id: string) => {
    const result = await prisma.contact.findUnique({
        where: {
            id,
            vataId: user.vataId
        },
    });
    return result;
};

const updateContactService = async (
    user: TAuthUser,
    id: string,
    payload: {
        name?: string;
        address?: string;
        occupation?: string;
        phone?: string;
    }
) => {
    const result = await prisma.contact.update({
        where: {
            id,
            vataId: user.vataId
        },
        data: payload,
    });

    return result;
};

const deleteContactService = async (user: TAuthUser, id: string) => {
    const result = await prisma.contact.delete({
        where: {
            id,
            vataId: user.vataId
        },
    });

    return result;
};

export const ContactService = {
    createContactService,
    getAllContactService,
    getSingleContactService,
    updateContactService,
    deleteContactService,
};