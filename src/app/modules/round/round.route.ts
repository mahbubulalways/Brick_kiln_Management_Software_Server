import { Router } from "express";
import { getRoundController } from "./round.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  getRoundController,
);

export default router;
