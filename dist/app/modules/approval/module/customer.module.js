"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerModule = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../../errors/ApplicationError");
const prisma_1 = require("../../../../helpers/prisma");
const customer_service_1 = require("../../customer/customer.service");
const customerModule = async (user, findRequest, approvalId) => {
    if (!findRequest) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অনুমোদনের তথ্য পাওয়া যায়নি।");
    }
    const newData = findRequest.newData;
    if (findRequest.action === "UPDATE") {
        const result = await customer_service_1.CustomerService.updateCustomerService(user, findRequest.targetId, newData);
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
            message: "কাস্টমারের তথ্য আপডেটের অনুরোধ সফলভাবে অনুমোদন করা হয়েছে।",
        };
    }
    throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "অবৈধ approval action।");
};
exports.customerModule = customerModule;
