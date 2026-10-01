"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const http_status_codes_1 = require("http-status-codes");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const ApplicationError_1 = require("../../errors/ApplicationError");
const activity_service_1 = require("../activity/activity.service");
const createContactService = async (user, payload) => {
    const result = await prisma_1.prisma.contact.create({
        data: {
            name: payload.name,
            address: payload.address,
            occupation: payload.occupation,
            phone: payload.phone,
            vataId: user.vataId,
        },
    });
    return result;
};
const getAllContactService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = { vataId: user.vataId };
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
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.contact.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
        }),
        prisma_1.prisma.contact.count({ where }),
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
const getSingleContactService = async (user, id) => {
    const result = await prisma_1.prisma.contact.findUnique({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    return result;
};
const updateContactService = async (user, id, payload) => {
    const oldContact = await prisma_1.prisma.contact.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!oldContact) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কন্টাক্টের তথ্য পাওয়া যায়নি।");
    }
    const oldData = {
        name: oldContact.name,
        address: oldContact.address,
        occupation: oldContact.occupation,
        phone: oldContact.phone,
    };
    const newData = {
        name: payload.name ?? oldContact.name,
        address: payload.address ?? oldContact.address,
        occupation: payload.occupation ?? oldContact.occupation,
        phone: payload.phone ?? oldContact.phone,
    };
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.contact.update({
                where: {
                    id,
                },
                data: {
                    ...payload,
                    updateStatus: "APPROVED",
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "UPDATE",
                module: "CONTACT",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData,
                newData,
                referenceNumber: oldData.name,
            });
            return result;
        });
        return {
            result,
            message: "কন্টাক্টের তথ্য সফলভাবে আপডেট করা হয়েছে।",
        };
    }
    await prisma_1.prisma.contact.update({
        where: {
            id,
        },
        data: {
            updateStatus: "PENDING",
        },
    });
    const result = await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "UPDATE",
            module: "CONTACT",
            targetId: id,
            requestedById: user.userId,
            vataId: user.vataId,
            status: "PENDING",
            oldData,
            newData,
        },
    });
    return {
        result,
        message: "কন্টাক্টের তথ্য আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
//
const deleteContactService = async (user, id) => {
    const oldContact = await prisma_1.prisma.contact.findFirst({
        where: {
            id,
            vataId: user.vataId,
        },
    });
    if (!oldContact) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "কন্টাক্টের তথ্য পাওয়া যায়নি।");
    }
    const oldData = {
        name: oldContact.name,
        address: oldContact.address,
        occupation: oldContact.occupation,
        phone: oldContact.phone,
    };
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.contact.delete({
                where: {
                    id,
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "DELETE",
                module: "CONTACT",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData,
            });
            return result;
        });
        return {
            result,
            message: "কন্টাক্টের তথ্য সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    await prisma_1.prisma.contact.update({
        where: {
            id,
        },
        data: {
            deleteStatus: "PENDING",
        },
    });
    const result = await prisma_1.prisma.approvalRequest.create({
        data: {
            action: "DELETE",
            module: "CONTACT",
            targetId: id,
            requestedById: user.userId,
            vataId: user.vataId,
            status: "PENDING",
            oldData,
        },
    });
    return {
        result,
        message: "কন্টাক্টের তথ্য মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে।",
    };
};
exports.ContactService = {
    createContactService,
    getAllContactService,
    getSingleContactService,
    updateContactService,
    deleteContactService,
};
