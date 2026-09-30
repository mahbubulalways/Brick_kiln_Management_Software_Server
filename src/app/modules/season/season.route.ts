import { Router } from "express";
import { prisma } from "../../../helpers/prisma";
import { SeasonController } from "./season.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { TAuthUser } from "../../../interface/token";

const router = Router();

// router.post(
//   "/create",
//   AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER,
// UserRole.OPERATOR,),
// );

router.get(
  "/",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SeasonController.getAllSeasons,
);
router.get(
  "/active",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SeasonController.getActiveSeason,
);

router.patch(
  "/select/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SeasonController.changeActiveSeason,
);

export default router;
