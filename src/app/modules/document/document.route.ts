import { Router } from "express";
import { DocumentController } from "./document.controller";
import { fileUploader } from "../../../utils/uploader";

const router = Router()

router.post("/create", DocumentController.createFolderController)
router.post("/upload",fileUploader.upload.single("file"), DocumentController.uploadDocumentController)
router.get("/all", DocumentController.getAllDocumentsController)
router.get("/folder/:id", DocumentController.getSingleDocumentController)
router.get("/folder-name/:id", DocumentController.getSingleFolderController)
router.delete("/delete-file/:id", DocumentController.deleteDocumentController)
router.delete("/delete-folder/:id", DocumentController.deleteFolderController)
router.patch("/update-folder/:id", DocumentController.updateFolderController)


export default router