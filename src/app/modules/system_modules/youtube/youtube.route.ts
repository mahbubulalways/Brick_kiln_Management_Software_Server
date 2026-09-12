import express from "express";
import { YoutubeLinkController } from "./youtube.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = express.Router();

router.post(
  "/create",
  AuthGuard(UserRole.SYSTEM_ADMIN, UserRole.SUPER_ADMIN),
  YoutubeLinkController.createYoutubeLinkController,
);

router.get(
  "/all",

  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.SYSTEM_ADMIN,
    UserRole.SUPER_ADMIN,
  ),
  YoutubeLinkController.getAllYoutubeLinksController,
);

router.delete(
  "/delete/:id",
  AuthGuard(UserRole.SYSTEM_ADMIN, UserRole.SUPER_ADMIN),
  YoutubeLinkController.deleteYoutubeLinkController,
);

export default router;
