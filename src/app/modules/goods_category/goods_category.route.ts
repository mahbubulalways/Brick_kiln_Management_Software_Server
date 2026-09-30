import { Router } from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import { GoodCategoryController } from "./goods_category.controller";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";
const router = Router();

router.post(
  "/create",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  GoodCategoryController.createGoodStockController,
);

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  GoodCategoryController.getAllGoodCategoryController,
);
router.get(
  "/options",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  GoodCategoryController.getGoodCategoryOptionsController,
);

router.get(
  "/single/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  GoodCategoryController.getSingleGoodCategoryController,
);

router.patch(
  "/update/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  GoodCategoryController.updateGoodCategoryController,
);
router.patch(
  "/delete/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  GoodCategoryController.deleteGoodCategoryController,
);

export default router;
