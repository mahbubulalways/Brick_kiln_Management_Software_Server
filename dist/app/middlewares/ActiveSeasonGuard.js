"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationError_1 = require("../errors/ApplicationError");
const prisma_1 = require("../../helpers/prisma");
const ActiveSeasonGuard = async (req, res, next) => {
    try {
        const activeSeason = await prisma_1.prisma.season.findFirst({
            where: {
                isActive: true,
            },
            select: {
                id: true,
                name: true,
            },
        });
        if (!activeSeason) {
            throw new ApplicationError_1.AppError(404, "No active season found");
        }
        req.seasonId = activeSeason.id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = ActiveSeasonGuard;
