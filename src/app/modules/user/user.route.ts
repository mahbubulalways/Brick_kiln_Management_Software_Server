import { Router } from "express";
import { UserController } from "./user.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.createUserController,
);

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.getAllUsersController,
);

router.get(
  "/options",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.getUserOptionController,
);

// GET LOGIN LOOUT
router.get(
  "/history",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.getUserHistoryController,
);
router.get(
  "/single/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.getSingleUserController,
);

router.patch(
  "/update/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.updateUserController,
);

router.delete(
  "/delete/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  UserController.deleteUserController,
);

export default router;
