"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../errors/ApplicationError");
const prisma_1 = require("../../../helpers/prisma");
const createCustomer = async (payload) => {
    const isExist = await prisma_1.prisma.customer.findFirst({
        where: {
            phoneNumber: payload.phoneNumber,
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "user with");
    }
};
exports.CustomerService = {};
