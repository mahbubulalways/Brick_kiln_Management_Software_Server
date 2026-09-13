import { Router } from "express";
import { SmsSendController } from "./send_sms.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SmsSendController.getVatasSendMessageController,
);

router.post(
  "/send",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SmsSendController.sendMessageToUserController,
);

export default router;
