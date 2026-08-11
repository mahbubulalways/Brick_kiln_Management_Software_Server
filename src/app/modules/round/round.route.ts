import { Router } from "express";
import { getRoundController } from "./round.controller";

const router = Router()

router.get("/all", getRoundController)

export default router