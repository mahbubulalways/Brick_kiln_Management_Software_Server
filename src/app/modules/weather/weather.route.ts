import { Router } from "express";
import { WeatherController } from "./weather.controller";

const router = Router();

router.post(
    "/create",
    WeatherController.createWeatherController
);

router.get(
    "/all",
    WeatherController.getAllWeatherController
);


export default router;