"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const prisma_1 = __importDefault(require("../../../helpers/prisma"));
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../../errors/ApplicationError");
const createCustomer = async (payload) => {
    const isExist = await prisma_1.default.customer.findFirst({
        where: {
            phoneNumber: payload.phoneNumber,
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "user with");
    }
};
exports.CustomerService = {};
//# sourceMappingURL=customer.service.js.map