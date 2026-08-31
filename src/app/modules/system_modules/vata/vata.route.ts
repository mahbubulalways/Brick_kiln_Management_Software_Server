import { Router } from "express";
import { AdminVataController } from "./vata.controller";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";

const router = Router()

// CREATE VATA
router.post('/create',
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    AdminVataController.createNewVataController)


// GET ALL VATA
router.get('/all',
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    AdminVataController.getAllVataController)
// GET ALL VATA
router.get('/inactive',
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    AdminVataController.getInactiveVataController)
    
// GET SINGLE VATA
router.get('/single/:id',
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    AdminVataController.getSingleVataController)
    
export default router