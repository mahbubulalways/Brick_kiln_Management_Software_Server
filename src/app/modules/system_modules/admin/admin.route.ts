import { Router } from "express";
import { AdminController } from "./admin.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = Router()
router.get("/create", AuthGuard(UserRole.SUPER_ADMIN), AdminController.createAdminController)
export default router