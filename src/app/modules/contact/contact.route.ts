import { Router } from "express";
import { ContactController } from "./contact.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();

router.post(
  "/create",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  ContactController.createContactController,
);

router.get(
  "/all",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ContactController.getAllContactController,
);
router.get(
  "/single/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ContactController.getSingleContactController,
);
router.patch(
  "/update/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  ContactController.updateContactController,
);
router.delete(
  "/delete/:id",
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  SubscriptionGuard,
  ContactController.deleteContactController,
);

export default router;
