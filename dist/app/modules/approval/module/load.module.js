"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const prisma_1 = require("../../../../helpers/prisma");
const load_type_1 = require("../../load/load.type");
const load_service_1 = require("../../load/load.service");
const loadModule = async (user, seasonId, findRequest, approvalId) => {
    if (findRequest.action === "UPDATE") {
        if (!findRequest) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।");
        }
        const newData = findRequest.newData;
        const findRound = await prisma_1.prisma.round.findFirst({
            where: { name: newData?.round },
            select: { id: true },
        });
        const formatData = {
            date: newData.date,
            loadType: (0, load_type_1.getMovementTypeEnglish)(newData.loadType),
            roundId: findRound?.id,
            quantity: Number(newData?.quantity),
        };
        const result = await load_service_1.LoadInfoService.updateLoadInfoService(user, seasonId, findRequest?.targetId, formatData);
        await prisma_1.prisma.approvalRequest.update({
            where: {
                id: approvalId,
            },
            data: {
                status: "APPROVED",
                reviewedAt: new Date(),
            },
        });
        return {
            result,
            message: "ইটের লোড আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    if (findRequest.action === "DELETE") {
        const result = await load_service_1.LoadInfoService.deleteLoadInfoService(user, findRequest.targetId);
        await prisma_1.prisma.approvalRequest.update({
            where: {
                id: approvalId,
            },
            data: {
                status: "APPROVED",
                reviewedAt: new Date(),
            },
        });
        return {
            result,
            message: "ইটের লোড মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
};
exports.loadModule = loadModule;
