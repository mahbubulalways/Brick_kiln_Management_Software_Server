import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { DueCollectionController } from "./due_collection.controller";

const router = Router();

router.get(
  API_ENDPOINTS.DUE_COLLECTION.TODAYS_HAVE_DUE,
  DueCollectionController.todayPayDueController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.TODAY_PAID,
  DueCollectionController.getTodaysDuePaidController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.ALL_DUE,
  DueCollectionController.getAllDueListController
);

router.post(
  API_ENDPOINTS.DUE_COLLECTION.COLLECTION,
  DueCollectionController.collectionNewDueController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.GET_CUSTOMER_DUE,
  DueCollectionController.getDueOfCustomerController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE,
  DueCollectionController.getSingleDueCollectionController
);

router.get(
  API_ENDPOINTS.DUE_COLLECTION.GET_SINGLE_DATE,
  DueCollectionController.getSingleDueCollectionDateController
);

router.patch(
  API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION,
  DueCollectionController.updateDueCollectionController
);

router.patch(
  API_ENDPOINTS.DUE_COLLECTION.UPDATE_DUE_COLLECTION_DATE,
  DueCollectionController.updateDueCollectionDateController
);
export default router;
