import { Router } from "express";
import { DocumentController } from "./document.controller";
import { fileUploader } from "../../../utils/uploader";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  DocumentController.createFolderController,
);

router.post(
  "/upload",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  fileUploader.upload.single("file"),
  DocumentController.uploadDocumentController,
);

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DocumentController.getAllDocumentsController,
);

router.get(
  "/folder/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DocumentController.getSingleDocumentController,
);

router.get(
  "/folder-name/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DocumentController.getSingleFolderController,
);

router.delete(
  "/delete-file/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  SubscriptionGuard,
  DocumentController.deleteDocumentController,
);

router.delete(
  "/delete-folder/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  DocumentController.deleteFolderController,
);

router.patch(
  "/update-folder/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  DocumentController.updateFolderController,
);

export default router;
