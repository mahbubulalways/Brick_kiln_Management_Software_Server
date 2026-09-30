import { Router } from "express";
import { DocumentController } from "./document.controller";
import { fileUploader } from "../../../utils/uploader";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
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
  DocumentController.createFolderController,
);

router.post(
  "/upload",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  fileUploader.upload.single("file"),
  DocumentController.uploadDocumentController,
);

router.get(
  "/all",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DocumentController.getAllDocumentsController,
);

router.get(
  "/folder/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DocumentController.getSingleDocumentController,
);

router.get(
  "/folder-name/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DocumentController.getSingleFolderController,
);

router.delete(
  "/delete-file/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  SubscriptionGuard,
  DocumentController.deleteDocumentController,
);

router.delete(
  "/delete-folder/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  DocumentController.deleteFolderController,
);

router.patch(
  "/update-folder/:id",
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  DocumentController.updateFolderController,
);

export default router;
