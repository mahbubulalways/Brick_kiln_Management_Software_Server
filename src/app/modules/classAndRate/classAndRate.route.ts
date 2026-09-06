import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { ClassAndRateController } from "./classAndRateRoute.controller";
import VALIDATE_REQUEST from "../../middlewares/validateRequest";
import { CLASS_AND_RATE_VALIDATION } from "./classAndRate.validation";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();
// POST A CLASS AND RATE
router.post(
  API_ENDPOINTS.CLASS_AND_RATE.CREATE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  VALIDATE_REQUEST(CLASS_AND_RATE_VALIDATION),
  ClassAndRateController.createClassAndRateController
);

// GET ALL CLASS AND RATE
router.get(
  API_ENDPOINTS.CLASS_AND_RATE.GET_ALL_ClASS,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ClassAndRateController.getClassAndRateController
);


// GET ALL CLASS AND RATE OPTIONS
router.get(
  API_ENDPOINTS.CLASS_AND_RATE.OPTIONS,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ClassAndRateController.getClassAndRateOptionsController
);

// GET SINGLE CLASS AND RATE BY ID
router.get(
  API_ENDPOINTS.CLASS_AND_RATE.GET_CLASS_BY_ID,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ClassAndRateController.getSingleClassAndRateController
);
router.patch(
  API_ENDPOINTS.CLASS_AND_RATE.UPDATE_CLASS_BY_ID,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ClassAndRateController.updateClassAndRateController
);

router.delete(
  API_ENDPOINTS.CLASS_AND_RATE.DELETE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  ClassAndRateController.deleteClassAndRateController
);
export default router;
