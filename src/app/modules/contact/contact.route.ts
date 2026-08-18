import { Router } from "express";
import  { ContactController } from "./contact.controller";

const router = Router();

router.post("/create", ContactController.createContactController);
router.get("/all", ContactController.getAllContactController);
router.get("/single/:id", ContactController.getSingleContactController);
router.patch("/update/:id", ContactController.updateContactController);
router.delete("/delete/:id", ContactController.deleteContactController);

export default router;