"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const approval_utils_1 = require("../approval/approval.utils");
const createActivityService = async ({ vataId, userId, action, module, targetId, newData, oldData, referenceNumber, }) => {
    const description = (0, approval_utils_1.generateActivityDescription)(module, action, oldData, newData, referenceNumber);
    const result = await prisma_1.prisma.activityLog.create({
        data: {
            vataId,
            userId,
            action,
            module,
            targetId,
            description,
        },
    });
    return result;
};
// GET ALL ACTIVITY LOG
const getAllActivityLogService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.activityLog.findMany({
            where: { vataId: user.vataId, isDeleted: false },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
        prisma_1.prisma.activityLog.count({
            where: { vataId: user.vataId, isDeleted: false },
        }),
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
exports.ActivityService = {
    createActivityService,
    getAllActivityLogService,
};
