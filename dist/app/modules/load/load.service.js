"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadInfoService = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("../../../generated/prisma/client");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getDateRangeDbSearch_1 = require("../../../utils/getDateRangeDbSearch");
const ApplicationError_1 = require("../../errors/ApplicationError");
const load_utils_1 = require("./load.utils");
const activity_service_1 = require("../activity/activity.service");
const load_type_1 = require("./load.type");
// CREATE LOAD INFO
const createLoadInfoService = async (user, seasonId, payload) => {
    const round = payload.round;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // ROUND OPERATIONS
        let roundExist = await tx.round.findFirst({
            where: {
                name: round,
                vataId: user.vataId,
                seasonId,
            },
        });
        if (!roundExist) {
            roundExist = await tx.round.create({
                data: {
                    name: round,
                    vataId: user.vataId,
                    seasonId,
                },
            });
        }
        // QUANTITY
        const quantity = Number(payload.quantity || 0);
        // CHECK AVAILABILITY
        await (0, load_utils_1.checkAvailableBrick)(tx, user.vataId, payload.loadType, quantity);
        // BRICK STOCK SUMMARUY
        let brickSummary = await tx.brickStockSummary.findFirst({
            where: {
                vataId: user.vataId,
            },
        });
        if (!brickSummary) {
            brickSummary = await tx.brickStockSummary.create({
                data: {
                    vataId: user.vataId,
                    rawBrick: 0,
                    fieldBrick: 0,
                    stockBrick: 0,
                    chulliBrick: 0,
                },
            });
        }
        // LOAD CREATE
        const load = await tx.loadInfo.create({
            data: {
                date: payload.date,
                loadType: payload.loadType,
                roundId: roundExist.id,
                quantity,
            },
        });
        // UPDATE BRICK STOCK SUMMARY
        if (payload.loadType === client_1.LoadType.RAWENTRY) {
            await tx.brickStockSummary.update({
                where: {
                    id: brickSummary.id,
                },
                data: {
                    rawBrick: {
                        increment: quantity,
                    },
                },
            });
        }
        else if (payload.loadType === client_1.LoadType.RAW_TO_FIELD) {
            await tx.brickStockSummary.update({
                where: {
                    vataId: user.vataId,
                },
                data: {
                    rawBrick: { decrement: quantity },
                    fieldBrick: { increment: quantity },
                },
            });
        }
        else if (payload.loadType === client_1.LoadType.FIELD_TO_CHULLI) {
            await tx.brickStockSummary.update({
                where: {
                    vataId: user.vataId,
                },
                data: {
                    fieldBrick: { decrement: quantity },
                    chulliBrick: { increment: quantity },
                },
            });
        }
        else if (payload.loadType === client_1.LoadType.STOCK_TO_CHULLI) {
            await tx.brickStockSummary.update({
                where: {
                    vataId: user.vataId,
                },
                data: {
                    stockBrick: { decrement: quantity },
                    chulliBrick: { increment: quantity },
                },
            });
        }
        else if (payload.loadType === client_1.LoadType.FIELD_TO_STOCK) {
            await tx.brickStockSummary.update({
                where: {
                    vataId: user.vataId,
                },
                data: {
                    fieldBrick: { decrement: quantity },
                    stockBrick: { increment: quantity },
                },
            });
        }
        return load;
    });
    return result;
};
// GET ALL LOAD INFO
const getAllLoadInfoService = async (user, seasonId, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const where = {
        isDeleted: false,
        round: { vataId: user.vataId, seasonId },
    };
    // DATE FILTER
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    // SEARCH
    if (query.search?.trim()) {
        const search = query.search.trim();
        where.OR = [
            {
                round: {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },
        ];
    }
    const [result, total] = await Promise.all([
        prisma_1.prisma.loadInfo.findMany({
            where,
            skip,
            take: limit,
            include: {
                round: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma_1.prisma.loadInfo.count({
            where,
        }),
    ]);
    const meta = (0, createMetaConfig_1.createMetaConfig)({
        limit,
        page,
        totalData: total,
    });
    return {
        meta,
        data: result,
    };
};
// GET SINGLE LOAD INFO
const getSingleLoadInfoService = async (user, id) => {
    return await prisma_1.prisma.loadInfo.findFirst({
        where: {
            id,
            isDeleted: false,
            round: {
                vataId: user.vataId,
            },
        },
        include: {
            round: true,
        },
    });
};
// UPDATE LOAD INFO
const updateLoadInfoService = async (user, seasonId, id, payload) => {
    payload.quantity = Number(payload.quantity || 0);
    const oldLoad = await prisma_1.prisma.loadInfo.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            date: true,
            loadType: true,
            quantity: true,
            round: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (!oldLoad) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লোডের তথ্য পাওয়া যায়নি।");
    }
    const round = await prisma_1.prisma.round.findFirst({
        where: {
            name: payload.round,
            vataId: user.vataId,
            seasonId,
        },
    });
    let newRound = round;
    if (!newRound) {
        newRound = await prisma_1.prisma.round.create({
            data: {
                name: payload.round,
                vataId: user.vataId,
                seasonId,
            },
        });
    }
    const formatOldData = {
        date: oldLoad.date,
        loadType: (0, load_type_1.getMovementTypeBangla)(oldLoad.loadType),
        quantity: oldLoad.quantity,
        round: oldLoad.round?.name,
    };
    const formatNewData = {
        date: payload.date,
        loadType: (0, load_type_1.getMovementTypeBangla)(payload.loadType),
        quantity: Number(payload.quantity || 0),
        round: newRound.name,
    };
    // ADMIN / OWNER
    if (user.role === "ADMIN" || user.role === "OWNER") {
        return await prisma_1.prisma.$transaction(async (tx) => {
            const brickSummary = await tx.brickStockSummary.findFirst({
                where: {
                    vataId: user.vataId,
                },
            });
            if (!brickSummary) {
                throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইটের স্টক তথ্য পাওয়া যায়নি।");
            }
            const oldQuantity = Number(oldLoad.quantity);
            const newQuantity = Number(payload.quantity || 0);
            // পুরোনো load stock থেকে বাদ দেওয়া quantity ফেরত দেওয়া
            await (0, load_utils_1.updateBrickStock)(tx, brickSummary.id, oldLoad.loadType, oldQuantity, true);
            // নতুন load-এর জন্য পর্যাপ্ত stock আছে কিনা check
            await (0, load_utils_1.checkAvailableBrick)(tx, user.vataId, payload.loadType, newQuantity);
            // নতুন load অনুযায়ী stock update
            await (0, load_utils_1.updateBrickStock)(tx, brickSummary.id, payload.loadType, newQuantity);
            // এখানে শুধু id ব্যবহার করবে
            const result = await tx.loadInfo.update({
                where: {
                    id,
                },
                data: {
                    date: payload.date,
                    loadType: payload.loadType,
                    roundId: newRound.id,
                    quantity: newQuantity,
                    updateStatus: "APPROVED",
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "UPDATE",
                module: "LOAD_INFO",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                newData: formatNewData,
                oldData: formatOldData,
                referenceNumber: formatNewData.loadType === formatOldData.loadType
                    ? (0, load_type_1.getMovementTypeBangla)(formatNewData.loadType)
                    : undefined,
            });
            return {
                result,
                message: "ইটের লোড সফলভাবে আপডেট করা হয়েছে।",
            };
        });
    }
    // NON ADMIN / OWNER
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const load = await tx.loadInfo.findFirst({
            where: {
                id,
                round: {
                    vataId: user.vataId,
                },
            },
        });
        if (!load) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "এই ভাটার লোডের তথ্য পাওয়া যায়নি।");
        }
        await tx.loadInfo.update({
            where: {
                id: load.id,
            },
            data: {
                updateStatus: "PENDING",
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "UPDATE",
                module: "LOAD_INFO",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                newData: formatNewData,
                oldData: formatOldData,
            },
        });
    });
    return {
        result,
        message: "ইটের লোড আপডেটের অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
const deleteLoadInfoService = async (user, id) => {
    const oldLoad = await prisma_1.prisma.loadInfo.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            date: true,
            loadType: true,
            quantity: true,
            round: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (!oldLoad) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "লোডের তথ্য পাওয়া যায়নি।");
    }
    const formatOldData = {
        date: oldLoad.date,
        loadType: (0, load_type_1.getMovementTypeBangla)(oldLoad.loadType),
        quantity: oldLoad.quantity,
        round: oldLoad.round?.name,
    };
    // ADMIN / OWNER
    if (user.role === "ADMIN" || user.role === "OWNER") {
        const result = await prisma_1.prisma.$transaction(async (tx) => {
            const brickSummary = await tx.brickStockSummary.findFirst({
                where: {
                    vataId: user.vataId,
                },
            });
            if (!brickSummary) {
                throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ইটের স্টক তথ্য পাওয়া যায়নি।");
            }
            const quantity = Number(oldLoad.quantity);
            switch (oldLoad.loadType) {
                case "RAWENTRY":
                    await tx.brickStockSummary.update({
                        where: {
                            id: brickSummary.id,
                        },
                        data: {
                            rawBrick: {
                                decrement: quantity,
                            },
                        },
                    });
                    break;
                case "RAW_TO_FIELD":
                    await tx.brickStockSummary.update({
                        where: {
                            id: brickSummary.id,
                        },
                        data: {
                            fieldBrick: {
                                decrement: quantity,
                            },
                        },
                    });
                    break;
                case "FIELD_TO_STOCK":
                    await tx.brickStockSummary.update({
                        where: {
                            id: brickSummary.id,
                        },
                        data: {
                            stockBrick: {
                                decrement: quantity,
                            },
                        },
                    });
                    break;
                case "FIELD_TO_CHULLI":
                case "STOCK_TO_CHULLI":
                    await tx.brickStockSummary.update({
                        where: {
                            id: brickSummary.id,
                        },
                        data: {
                            chulliBrick: {
                                decrement: quantity,
                            },
                        },
                    });
                    break;
                default:
                    throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অজানা লোডের ধরন।");
            }
            const result = await tx.loadInfo.update({
                data: {
                    isDeleted: true,
                    deleteStatus: "APPROVED",
                },
                where: {
                    id,
                    round: {
                        vataId: user.vataId,
                    },
                },
            });
            await activity_service_1.ActivityService.createActivityService({
                action: "DELETE",
                module: "LOAD_INFO",
                targetId: id,
                userId: user.userId,
                vataId: user.vataId,
                oldData: formatOldData,
                referenceNumber: `${(0, load_type_1.getMovementTypeBangla)(formatOldData?.loadType)} ${formatOldData?.quantity}`,
            });
            return result;
        });
        return {
            result,
            message: "ইটের লোড সফলভাবে মুছে ফেলা হয়েছে।",
        };
    }
    // NON ADMIN / OWNER
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        await tx.loadInfo.update({
            data: {
                deleteStatus: "PENDING",
            },
            where: {
                round: { vataId: user.vataId },
                id,
            },
        });
        return await tx.approvalRequest.create({
            data: {
                action: "DELETE",
                module: "LOAD_INFO",
                targetId: id,
                requestedById: user.userId,
                vataId: user.vataId,
                status: "PENDING",
                oldData: formatOldData,
            },
        });
    });
    return {
        result,
        message: "ইটের লোড মুছে ফেলার অনুরোধ অ্যাডমিনের কাছে পাঠানো হয়েছে",
    };
};
// LOAD REPORT
const getLoadReportService = async (user, query) => {
    const where = {
        round: { vataId: user.vataId },
        isDeleted: false,
    };
    if (query.date) {
        const dateRange = (0, getDateRangeDbSearch_1.getDateRangeDbSearch)(query.date);
        if (dateRange) {
            where.date = dateRange;
        }
    }
    const result = await prisma_1.prisma.loadInfo.findMany({
        where,
        select: {
            loadType: true,
            quantity: true,
        },
    });
    return result;
};
exports.LoadInfoService = {
    createLoadInfoService,
    getAllLoadInfoService,
    getSingleLoadInfoService,
    updateLoadInfoService,
    deleteLoadInfoService,
    getLoadReportService,
};
