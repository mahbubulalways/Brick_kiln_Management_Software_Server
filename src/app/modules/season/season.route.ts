import { Router } from "express";
import { prisma } from "../../../helpers/prisma";
import { SeasonController } from "./season.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { TAuthUser } from "../../../interface/token";

const router = Router();

// router.post(
//   "/create",
//   AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
// );

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
