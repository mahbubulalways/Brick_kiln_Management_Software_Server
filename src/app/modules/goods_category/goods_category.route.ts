import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { GoodCategoryController } from "./goods_category.controller";
const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  GoodCategoryController.createGoodStockController,
);

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  GoodCategoryController.getAllGoodCategoryController,
);
router.get(
  "/options",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  GoodCategoryController.getGoodCategoryOptionsController,
);

router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  GoodCategoryController.getSingleGoodCategoryController,
);

router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  GoodCategoryController.updateGoodCategoryController,
);
router.patch(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  GoodCategoryController.deleteGoodCategoryController,
);

export default router;
