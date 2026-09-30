import express from "express";
import { LoadInfoController } from "./load.controller";
import { UserRole } from "../../../generated/prisma/enums";
import AuthGuard from "../../middlewares/AuthGuard";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = express.Router();

// CREATE
router.post(
  "/create",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  ActiveSeasonGuard,
  LoadInfoController.createLoadInfoController,
);

// GET ALL
router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  LoadInfoController.getAllLoadInfoController,
);

// REPORT
router.get(
  "/report",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  LoadInfoController.getLoadInfoReportController,
);

// GET SINGLE
router.get(
  "/single/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  LoadInfoController.getSingleLoadInfoController,
);

// UPDATE
router.patch(
  "/update/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  ActiveSeasonGuard,
  LoadInfoController.updateLoadInfoController,
);

// DELETE
router.delete(
  "/delete/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  LoadInfoController.deleteLoadInfoController,
);

export default router;
