import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/ApplicationError";
import { prisma } from "../../helpers/prisma";
import { TAuthUser } from "../../interface/token";

const ActiveSeasonGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as TAuthUser;
    if (!user?.role) {
      throw new AppError(401, "User role not found");
    }
    const activeSeason = await prisma.season.findFirst({
      where: {
        vataId: user?.vataId,
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
