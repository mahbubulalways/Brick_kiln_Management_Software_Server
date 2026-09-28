"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRateModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const classAndRateRoute_service_1 = require("../../classAndRate/classAndRateRoute.service");
const prisma_1 = require("../../../../helpers/prisma");
const classRateModule = async (user, findRequest, approvalId) => {
    if (findRequest.action === "UPDATE") {
        if (!findRequest.newData) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।");
        }
        const newData = findRequest.newData;
        const result = await classAndRateRoute_service_1.ClassAndRateService.updateClassAndRateService(user, findRequest?.targetId, newData);
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
            message: "শ্রেণী ও রেট আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    if (findRequest.action === "DELETE") {
        const result = await classAndRateRoute_service_1.ClassAndRateService.deleteClassAndRateService(user, findRequest.targetId);
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
            message: "শ্রেণী ও রেট মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
};
exports.classRateModule = classRateModule;
