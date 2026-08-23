import { Router } from "express";
// import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { AUTH_LOGIN_VALIDATION } from "./auth.validation";
import { AuthController } from "./auth.controller";
import VALIDATE_REQUEST from "../../middlewares/validateRequest";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/login",
  // VALIDATE_REQUEST(AUTH_LOGIN_VALIDATION),
  AuthController.loginUserToSystemController,
);

router.post(
  "/logout",
  AuthGuard(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OWNER
  ),
  AuthController.logoutController,
);

router.post(
  "/change-password",
  AuthGuard(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OWNER
  ),
  AuthController.changePasswordController,
);

export default router;
