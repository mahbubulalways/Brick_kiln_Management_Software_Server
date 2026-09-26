"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = require("../../../helpers/prisma");
const createMetaConfig_1 = require("../../../utils/createMetaConfig");
const getAlApprovalService = async (user, query) => {
    const { limit, page, skip } = (0, paginationHelper_1.paginationHelper)(query.page, query.limit);
    const [result, total] = await Promise.all([
        prisma_1.prisma.approvalRequest.findMany({
            where: { vataId: user.vataId, isDeleted: false },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.approvalRequest.count({
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
exports.ApprovalService = {
    getAlApprovalService,
};
