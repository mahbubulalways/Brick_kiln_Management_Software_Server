import { Router } from "express";
import { ReportController } from "./report.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";

const router = Router()

router.get("/area",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ReportController.getAllCustomertController)
    
router.get("/dashboard",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    ReportController.dashboardAllReportController)

router.get("/load-unload",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ActiveSeasonGuard,
    ReportController.getLoadUnloadReportController)


export default router