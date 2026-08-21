import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { DueCollectionController } from "./due_collection.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  API_ENDPOINTS.DUE_COLLECTION.TODAYS_HAVE_DUE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.todayPayDueController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.TODAY_PAID,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.getTodaysDuePaidController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.ALL_DUE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.getAllDueListController
);

router.post(
  API_ENDPOINTS.DUE_COLLECTION.COLLECTION,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.collectionNewDueController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.GET_CUSTOMER_DUE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.getDueOfCustomerController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.getSingleDueCollectionController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE_DATE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.getSingleDueCollectionDateController
);

router.patch(
  API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.updateDueCollectionController
);

router.patch(
  API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION_DATE,
  AuthGuard(UserRole.OWNER, UserRole.ADMIN, UserRole.MANAGER),
  DueCollectionController.updateDueCollectionDateController
);
export default router;
