import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { fileUploader } from "../../../utils/uploader";
import { UserRole } from "../../../generated/prisma/enums";
import { GoodIssueController } from "./good_issue.controller";

const router = Router()
router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    fileUploader.upload.single("file"),
    GoodIssueController.createGoodIssueController
)

router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodIssueController.getAllGoodIssueController
)
router.get("/history",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodIssueController.getGoodIssueHistoryController
)

router.get("/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodIssueController.getSingleGoodIssueController
)

export default router