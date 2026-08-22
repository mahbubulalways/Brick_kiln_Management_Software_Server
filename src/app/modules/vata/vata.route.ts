import { Router } from "express";
import { VataController } from "./vata.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

// CREATE VATA
router.post('/create', VataController.createNewVataController)

router.get(
    '/info',
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    VataController.getVataInformationController
)

router.get(
    '/me',
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    VataController.getMyVataInformationController
)

router.get('/verify-domain/:id', VataController.checkSubdomainExistController)

export default router