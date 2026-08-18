"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weather_controller_1 = require("./weather.controller");
const router = (0, express_1.Router)();
router.post("/create", weather_controller_1.WeatherController.createWeatherController);
router.get("/all", weather_controller_1.WeatherController.getAllWeatherController);
exports.default = router;
