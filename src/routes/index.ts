import { Router } from "express";
import { IApplicationRoute } from "../interface/router";
import classAndRateRoute from "../app/modules/classAndRate/classAndRate.route";
import invoiceRoute from "../app/modules/challan/challan.route";
import deliveryRoute from "../app/modules/delivery/delivery.route";
import dueCollectionRoute from "../app/modules/due_collection/due_collection.route";
const router = Router();
const applicationRoutes: IApplicationRoute[] = [
  { path: "/class", route: classAndRateRoute },
  { path: "/invoice", route: invoiceRoute },
  { path: "/delivery", route: deliveryRoute },
  { path: "/due", route: dueCollectionRoute },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
