"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const prisma_1 = require("../../../../helpers/prisma");
const driver_service_1 = require("../../driver/driver.service");
const driverModule = async (user, findRequest, approvalId) => {
    if (!findRequest) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
    }
    if (findRequest.action === "UPDATE") {
        if (!findRequest.newData) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।");
        }
        const newData = findRequest.newData;
        const result = await driver_service_1.DriverService.updateDriverService(user, findRequest.targetId, newData);
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
            message: "ড্রাইভারের তথ্য আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    if (findRequest.action === "DELETE") {
        const result = await driver_service_1.DriverService.deleteDriverService(user, findRequest.targetId);
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
            message: "ড্রাইভার মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
exports.driverModule = driverModule;
