import { Router } from "express";
import { GoodStockController } from "./good_stock.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { fileUploader } from "../../../utils/uploader";

const router = Router()

router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    fileUploader.upload.single("file"),
    GoodStockController.createGoodStockController)

router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getAllGoodStockController)
router.get("/options",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getGoodStockOptionsController)

export default router