import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.post("/create", UserController.createUserController)
router.get("/all", UserController.getAllUsersController)
router.get("/options",UserController.getUserOptionController)
// GET LOGIN LOOUT
router.get("/history",UserController.getUserHistoryController)
router.get("/single/:id", UserController.getSingleUserController)
router.patch("/update/:id", UserController.updateUserController)
router.delete("/delete/:id", UserController.deleteUserController)

export default router