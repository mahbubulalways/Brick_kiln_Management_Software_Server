import { Router } from "express";
import { UnloadController } from "./unload.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  ActiveSeasonGuard,
  UnloadController.createUnloadInfoController,
);

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  UnloadController.getAllUnloadInfoController,
);

router.get(
  "/report",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  UnloadController.getAllUnloadDataNoPaginateController,
);

router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  UnloadController.getAllUnloadInfoController,
);

export default router;
