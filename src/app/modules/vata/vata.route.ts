import { Router } from "express";
import { VataController } from "./vata.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/info",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataController.getVataInformationController,
);

router.get(
  "/me",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataController.getMyVataInformationController,
);
router.get(
  "/nav",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataController.getMyVataNavbarFeaturesController,
);

router.get(
  "/subscription-status",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VataController.getVataExpirityController,
);

router.get("/verify-domain/:id", VataController.checkSubdomainExistController);

export default router;
