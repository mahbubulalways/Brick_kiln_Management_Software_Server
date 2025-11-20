import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { DeliveryController } from "./delivery.controller";

const router = Router();
router.post(
  API_ENDPOINTS.DELIVERY.CREATE_DELIVERY,
  DeliveryController.createDeliveryController
);

router.get(
  API_ENDPOINTS.DELIVERY.GET_NEXT_DELIVERY_NO,
  DeliveryController.getNextDeliveryNoController
);

router.get(
  API_ENDPOINTS.DELIVERY.TODAY_HAVE_TO_DELIVERY,
  DeliveryController.getDeliveryThatGoTodayController
);
router.get(
  API_ENDPOINTS.DELIVERY.ALL_DELIVERY_LIST,
  DeliveryController.getAllDeliveryListController
);

router.get(
  API_ENDPOINTS.DELIVERY.TODAYS_DELIVERY,
  DeliveryController.getTodaysDeliveryThatDoneController
);

router.get(
  API_ENDPOINTS.DELIVERY.GET_SINGLE_DELIVERY,
  DeliveryController.getSingleDeliveryController
);

export default router;
