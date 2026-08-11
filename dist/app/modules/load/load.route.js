"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const load_controller_1 = require("./load.controller");
const router = express_1.default.Router();
// CREATE
router.post("/create", load_controller_1.LoadInfoController.createLoadInfoController);
// GET ALL
router.get("/all", load_controller_1.LoadInfoController.getAllLoadInfoController);
// GET SINGLE
router.get("/single/:id", load_controller_1.LoadInfoController.getSingleLoadInfoController);
// UPDATE
router.patch("/update/:id", load_controller_1.LoadInfoController.updateLoadInfoController);
// DELETE
router.delete("/delete/:id", load_controller_1.LoadInfoController.deleteLoadInfoController);
exports.default = router;
