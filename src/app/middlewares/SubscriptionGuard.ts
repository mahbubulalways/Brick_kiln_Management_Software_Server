import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { prisma } from "../../helpers/prisma";
import { AppError } from "../errors/ApplicationError";

const SubscriptionGuard = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user?.vataId) {
      return next();
    }

    const vata = await prisma.vata.findUnique({
      where: {
        vataId: user.vataId,
      },
      select: {
        subscriptionEnd: true,
      },
    });

    if (!vata?.subscriptionEnd) {
      return next();
    }

    const isExpired = new Date(vata.subscriptionEnd).getTime() < Date.now();

    if (!isExpired) {
      return next();
    }

    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "আপনার সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে। সাবস্ক্রিপশন নবায়ন করুন।",
      );
    }

    next();
  },
);

export default SubscriptionGuard;
