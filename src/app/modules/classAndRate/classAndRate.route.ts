import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { ClassAndRateController } from "./classAndRateRoute.controller";
import VALIDATE_REQUEST from "../../middlewares/validateRequest";
import { CLASS_AND_RATE_VALIDATION } from "./classAndRate.validation";

const router = Router();
// POST A CLASS AND RATE
router.post(
  API_ENDPOINTS.CLASS_AND_RATE.CREATE,
  VALIDATE_REQUEST(CLASS_AND_RATE_VALIDATION),
  ClassAndRateController.createClassAndRateController
);

// GET ALL CLASS AND RATE
router.get(
  API_ENDPOINTS.CLASS_AND_RATE.GET_ALL_ClASS,
  ClassAndRateController.getClassAndRateController
);

// GET SINGLE CLASS AND RATE BY ID
router.get(
  API_ENDPOINTS.CLASS_AND_RATE.GET_CLASS_BY_ID,
  ClassAndRateController.getSingleClassAndRateController
);
router.patch(
  API_ENDPOINTS.CLASS_AND_RATE.UPDATE_CLASS_BY_ID,
  ClassAndRateController.updateClassAndRateController
);
export default router;
