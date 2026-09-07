import { Router } from "express";
import AuthGuard from "../../../middlewares/AuthGuard";
import { UserRole } from "../../../../generated/prisma/enums";
import { SmsRateController } from "./sms_rate.controller";

const router = Router()

router.post(
    "/update",
    AuthGuard(UserRole.SUPER_ADMIN, UserRole.SYSTEM_ADMIN),
    SmsRateController.createOrUpdateSmsRateController
)


router.get(
    "/",
    AuthGuard(
        UserRole.SUPER_ADMIN,
        UserRole.SYSTEM_ADMIN,
        UserRole.OWNER,
        UserRole.ADMIN,
        UserRole.MANAGER
    ),
    SmsRateController.getSmsRateController
)


export default router
