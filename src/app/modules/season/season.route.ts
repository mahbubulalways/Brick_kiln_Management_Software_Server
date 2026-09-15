import { Router } from "express";
import { prisma } from "../../../helpers/prisma";
import { SeasonController } from "./season.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { TAuthUser } from "../../../interface/token";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  async (req, res, next) => {
    try {
      const currentYear = new Date().getFullYear();
      const vata = req.user as TAuthUser;
      const seasons = Array.from({ length: 25 }, (_, index) => {
        const startYear = 2025 + index;
        const endYear = startYear + 1;

        return {
          name: `${startYear}-${endYear}`,
          startDate: new Date(`${startYear}-10-01T00:00:00.000Z`),
          endDate: new Date(`${endYear}-09-30T23:59:59.999Z`),
          isActive: startYear === currentYear,
          vataId: vata.vataId,
        };
      });

      const result = await prisma.season.createMany({
        data: seasons,
        skipDuplicates: true,
      });

      res.status(200).json({
        success: true,
        message: "সিজন সফলভাবে তৈরি হয়েছে",
        data: result,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
);

router.get(
  "/",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SeasonController.getAllSeasons,
);
router.get(
  "/active",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SeasonController.getActiveSeason,
);

router.patch(
  "/select/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SeasonController.changeActiveSeason,
);

export default router;
