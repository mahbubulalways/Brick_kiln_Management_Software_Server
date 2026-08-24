import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/ApplicationError";
import { prisma } from "../../helpers/prisma";


const ActiveSeasonGuard = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const activeSeason = await prisma.season.findFirst({
            where: {
                isActive: true,
            },
            select: {
                id: true,
                name: true,
            },
        });

        if (!activeSeason) {
            throw new AppError(404, "No active season found");
        }
        req.seasonId = activeSeason.id;

        next();
    } catch (error) {
        next(error);
    }
};

export default ActiveSeasonGuard;