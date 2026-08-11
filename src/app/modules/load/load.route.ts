import express from "express";
import { LoadInfoController } from "./load.controller";

const router = express.Router();

// CREATE
router.post(
    "/create",
    LoadInfoController.createLoadInfoController
);

// GET ALL
router.get(
    "/all",
    LoadInfoController.getAllLoadInfoController
);

// GET SINGLE
router.get(
    "/single/:id",
    LoadInfoController.getSingleLoadInfoController
);

// UPDATE
router.patch(
    "/update/:id",
    LoadInfoController.updateLoadInfoController
);

// DELETE
router.delete(
    "/delete/:id",
    LoadInfoController.deleteLoadInfoController
);

export default router;