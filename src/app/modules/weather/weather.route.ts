import { Router } from "express";
import { WeatherController } from "./weather.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post(
    "/create",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    WeatherController.createWeatherController
);

router.get(
    "/all",
    AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
    WeatherController.getAllWeatherController
);


export default router;