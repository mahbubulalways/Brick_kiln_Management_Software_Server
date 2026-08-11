import { Router } from "express";
import { UnloadController } from "./unload.controller";

const router = Router()

router.post("/create", UnloadController.createUnloadInfoController)
router.get("/all", UnloadController.getAllUnloadInfoController)


export default router