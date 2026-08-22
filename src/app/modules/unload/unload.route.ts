import { Router } from "express";
import { UnloadController } from "./unload.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UnloadController.createUnloadInfoController)

router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UnloadController.getAllUnloadInfoController)

router.get("/report",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UnloadController.getAllUnloadDataNoPaginateController)

router.delete("/delete/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    UnloadController.getAllUnloadInfoController)


export default router