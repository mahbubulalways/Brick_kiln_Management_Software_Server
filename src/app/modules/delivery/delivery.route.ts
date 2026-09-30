import { Router } from "express";
import { API_ENDPOINTS } from "../../endpoints/api_endpoints";
import { DeliveryController } from "./delivery.controller";
import AuthGuard from "../../middlewares/AuthGuard";
import { UserRole } from "../../../generated/prisma/enums";
import ActiveSeasonGuard from "../../middlewares/ActiveSeasonGuard";
import SubscriptionGuard from "../../middlewares/SubscriptionGuard";

const router = Router();
router.post(
  API_ENDPOINTS.DELIVERY.CREATE_DELIVERY,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  SubscriptionGuard,
  DeliveryController.createDeliveryController,
);

router.get(
  API_ENDPOINTS.DELIVERY.GET_NEXT_DELIVERY_NO,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  DeliveryController.getNextDeliveryNoController,
);

router.get(
  API_ENDPOINTS.DELIVERY.TODAY_HAVE_TO_DELIVERY,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  DeliveryController.getDeliveryThatGoTodayController,
);
router.get(
  API_ENDPOINTS.DELIVERY.ALL_DELIVERY_LIST,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  DeliveryController.getAllDeliveryListController,
);

router.get(
  API_ENDPOINTS.DELIVERY.TODAYS_DELIVERY,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  ActiveSeasonGuard,
  DeliveryController.getTodaysDeliveryThatDoneController,
);

router.get(
  API_ENDPOINTS.DELIVERY.GET_SINGLE_DELIVERY,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DeliveryController.getSingleDeliveryController,
);

router.patch(
  API_ENDPOINTS.DELIVERY.STATUS_CHANGE,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DeliveryController.changeDeliveryStatusController,
);

router.patch(
  API_ENDPOINTS.DELIVERY.DELETE_DELIVERY,
  AuthGuard(
    UserRole.OWNER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OPERATOR,
  ),
  DeliveryController.deleteDeliveryController,
);

export default router;
