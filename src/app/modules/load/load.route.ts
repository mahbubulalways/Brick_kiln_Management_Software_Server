import express from "express";
import { LoadInfoController } from "./load.controller";
import { UserRole } from "../../../generated/prisma/enums";
import AuthGuard from "../../middlewares/AuthGuard";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";

const router = express.Router();

// CREATE
router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  LoadInfoController.createLoadInfoController,
);

// GET ALL
router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  LoadInfoController.getAllLoadInfoController,
);

// REPORT
router.get(
  "/report",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  LoadInfoController.getLoadInfoReportController,
);

// GET SINGLE
router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  LoadInfoController.getSingleLoadInfoController,
);

// UPDATE
router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ActiveSeasonGuard,
  LoadInfoController.updateLoadInfoController,
);

// DELETE
router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  LoadInfoController.deleteLoadInfoController,
);

export default router;
