import { Router } from "express";
import { CarRentController } from "./car_rent.controller";


const router = Router();

router.post(
    "/create",
    CarRentController.createCarRentController
);

router.get(
    "/all",
    CarRentController.getALlCarRentController
);

router.get(
    "/single/:id",
    CarRentController.getSingleCarRentController
);

router.patch(
    "/update/:id",
    CarRentController.updateCarRentController
);

router.delete(
    "/delete/:id",
    CarRentController.deleteCarRentController
);

export default router;