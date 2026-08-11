"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnloadService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../helpers/prisma");
const ApplicationError_1 = require("../../errors/ApplicationError");
const createNewUnloadService = async (payload) => {
    const startOfDay = new Date(payload.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(payload.date);
    endOfDay.setHours(23, 59, 59, 999);
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const roundId = await tx.round.findFirst({ where: { name: payload.round }, select: { id: true } });
        if (!roundId?.id) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "ROUND ID PAI NAI");
        }
        let unload = await tx.unload.findFirst({
            where: {
                roundId: roundId.id, date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
            select: { id: true }
        });
        if (!unload?.id) {
            unload = await tx.unload.create({
                data: {
                    date: payload.date,
                    roundId: roundId?.id,
                }
            });
        }
        // FIND CLASS ID
        const classId = await tx.classAndRate.findFirst({
            where: { className: payload.className },
            select: { id: true }
        });
        if (!classId) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "CLASS PAI NAI");
        }
        const findRoundItem = await tx.unloadItem.findFirst({
            where: { classId: classId?.id, unloadId: unload.id }
        });
        let item;
        if (findRoundItem) {
            item = await tx.unloadItem.update({
                where: {
                    id: findRoundItem.id,
                },
                data: {
                    quantity: Number(payload.quantity),
                }
            });
        }
        else {
            item = await tx.unloadItem.create({
                data: {
                    classId: classId?.id,
                    quantity: Number(payload.quantity),
                    unloadId: unload.id
                }
            });
        }
        return item;
    });
    return result;
};
// gert
// GET ALL UNLOAD
const getAllUnloadService = async () => {
    const result = await prisma_1.prisma.unload.findMany({
        include: {
            round: true,
            unloadItems: {
                include: {
                    classType: {
                        select: {
                            className: true,
                            id: true
                        }
                    }
                }
            }
        }
    });
    return {
        data: result
    };
};
exports.UnloadService = {
    createNewUnloadService,
    getAllUnloadService
};
