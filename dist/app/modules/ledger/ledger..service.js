"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
// GET LEDGER COUNT
const getLedgerCountService = async () => {
    const res = await prisma_1.prisma.ledger.count();
    return res + 1;
};
// CREATE A LEDGER
const createLedgerService = async (data) => {
    const isExist = await prisma_1.prisma.ledger.findFirst({
        where: {
            name: data.name,
        },
    });
    if (isExist) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.CONFLICT, "এই নামে একটি লেজার বা লেজার গ্রুপ ইতোমধ্যে রয়েছে।");
    }
    const result = await prisma_1.prisma.ledger.create({
        data,
    });
    return result;
};
// GET GROUP OPTION
const getLedgerOptionService = async () => {
    const res = await prisma_1.prisma.ledger.findMany({
        where: {
            parentId: null,
        },
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return res;
};
// GET ALL LEDGER WITH CHILDREN
const getAllLedgerWithChildrenService = async () => {
    const res = await prisma_1.prisma.ledger.findMany({
        where: {
            parentId: null,
        },
        select: {
            id: true,
            name: true,
            children: { select: { name: true, id: true } },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    return res;
};
exports.LedgerService = {
    getLedgerCountService,
    createLedgerService,
    getLedgerOptionService,
    getAllLedgerWithChildrenService,
};
