import { Router } from "express";
import { ReportController } from "./report.controller";

const router = Router()

router.get("/area", ReportController.getAllCustomertController)


export default router