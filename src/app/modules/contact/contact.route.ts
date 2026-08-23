import { Router } from "express";
import { ContactController } from "./contact.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ContactController.createContactController);
router.get("/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ContactController.getAllContactController);
router.get("/single/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ContactController.getSingleContactController);
router.patch("/update/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ContactController.updateContactController);
router.delete("/delete/:id",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    ContactController.deleteContactController);

export default router;