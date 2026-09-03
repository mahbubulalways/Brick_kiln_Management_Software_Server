import { Router } from "express";
import { GoodStockController } from "./good_stock.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { fileUploader } from "../../../utils/uploader";

const router = Router()

// CREATE GOOD
router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    fileUploader.upload.single("file"),
    GoodStockController.createGoodStockController)

// GET ALL
router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getAllGoodStockController)

// GET OPTIONS
router.get("/options",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getGoodStockOptionsController)

// GET DAMAGE
router.get("/demage",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getDemageController)

// GET LOST
router.get("/lost",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getLostController)

// GET SINGLE GOOD
router.get("/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getSingleGoodStockController)

// GET SINGLE GOOD
router.get("/single-info/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getSingleGoodStockInfoForUpdateController)

// GET LOSS
router.get("/loss/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.getSingleGoodLossController)

// UPDATE
router.patch("/loss/update/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.updateGoodLossController)

// DELETE GOOD
router.delete("/delete/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    GoodStockController.deleteGoodStockController)

// UPDATE
router.patch("/update-good/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    fileUploader.upload.single("file"),
    GoodStockController.updateGoodStockController)
export default router