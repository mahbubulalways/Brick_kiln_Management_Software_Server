import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router()
router.get("/create", 
    // AuthGuard(UserRole.SUPER_ADMIN),
     AdminController.createAdminController)
export default router