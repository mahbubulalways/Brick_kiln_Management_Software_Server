import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import AuthGuard from "../../middlewares/AuthGuard";
import { NoteController } from "./note.controller";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
  NoteController.createNote,
);

router.get(
  "/",
  AuthGuard(
    UserRole.SUPER_ADMIN,
    UserRole.SYSTEM_ADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OWNER,
  ),
  NoteController.getNotes,
);

export default router;
