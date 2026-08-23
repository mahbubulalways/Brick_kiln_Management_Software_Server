import { Router } from "express";
import { UserController } from "./user.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.createUserController)

router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.getAllUsersController)


router.get("/options",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.getUserOptionController)

// GET LOGIN LOOUT
router.get("/history",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.getUserHistoryController)
router.get("/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.getSingleUserController)


router.patch("/update/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.updateUserController)


router.delete("/delete/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UserController.deleteUserController)

export default router