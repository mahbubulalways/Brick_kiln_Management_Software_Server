import { Router } from "express";
import { ReportController } from "./report.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.get("/area",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReportController.getAllCustomertController)
    
router.get("/dashboard",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReportController.dashboardAllReportController)


export default router