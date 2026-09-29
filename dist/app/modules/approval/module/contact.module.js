"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const prisma_1 = require("../../../../helpers/prisma");
const contact_service_1 = require("../../contact/contact.service");
const contactModule = async (user, findRequest, approvalId) => {
    if (!findRequest) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
    }
    if (findRequest.action === "UPDATE") {
        if (!findRequest.newData) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "আপডেটের জন্য নতুন তথ্য পাওয়া যায়নি।");
        }
        const newData = findRequest.newData;
        const result = await contact_service_1.ContactService.updateContactService(user, findRequest.targetId, newData);
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
            message: "ফোন নম্বর আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    if (findRequest.action === "DELETE") {
        const result = await contact_service_1.ContactService.deleteContactService(user, findRequest.targetId);
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
            message: "ফোন নম্বর মুছে ফেলার অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
};
exports.contactModule = contactModule;
