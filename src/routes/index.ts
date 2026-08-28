import { Router } from "express";
import { IApplicationRoute } from "../interface/router";
import classAndRateRoute from "../app/modules/classAndRate/classAndRate.route";
import invoiceRoute from "../app/modules/challan/challan.route";
import deliveryRoute from "../app/modules/delivery/delivery.route";
import dueCollectionRoute from "../app/modules/due_collection/due_collection.route";
import authRoute from "../app/modules/auth/auth.route";
import ledgerRoute from "../app/modules/ledger/ledger.route";
import paymentRoute from "../app/modules/payment/payment.route";
import cashRoute from "../app/modules/cash/cash.route";
import loadRoute from "../app/modules/load/load.route";
import roundRoute from "../app/modules/round/round.route";
import unloadRoute from "../app/modules/unload/unload.route";
import CustomerRoute from "../app/modules/customer/customer.route";
import reportRoute from "../app/modules/report/report.route";
import documentRoute from "../app/modules/document/document.route";
import carRentRoute from "../app/modules/car_rent/car_rent.route";
import userRoute from "../app/modules/user/user.route";
import taskRoute from "../app/modules/task/task.route";
import dueMateRoute from "../app/modules/receivable_payable/receivable_payable.route";
import contactRoute from "../app/modules/contact/contact.route";
import weathertRoute from "../app/modules/weather/weather.route";
import vataRoute from "../app/modules/vata/vata.route";
import seasonRoute from "../app/modules/season/season.route";
import driverRoute from "../app/modules/driver/driver.route";

const router = Router();
const applicationRoutes: IApplicationRoute[] = [
  { path: "/class", route: classAndRateRoute },
  { path: "/invoice", route: invoiceRoute },
  { path: "/delivery", route: deliveryRoute },
  { path: "/due", route: dueCollectionRoute },
  { path: "/auth", route: authRoute },
  { path: "/ledger", route: ledgerRoute },
  { path: "/payment", route: paymentRoute },
  { path: "/cash", route: cashRoute },
  { path: "/load-info", route: loadRoute },
  { path: "/round", route: roundRoute },
  { path: "/unload", route: unloadRoute },
  { path: "/customer", route: CustomerRoute },
  { path: "/report", route: reportRoute },
  { path: "/document", route: documentRoute },
  { path: "/car-rent", route: carRentRoute },
  { path: "/user", route: userRoute },
  { path: "/task", route: taskRoute },
  { path: "/due-mate", route: dueMateRoute },
  { path: "/contact", route: contactRoute },
  { path: "/weather", route: weathertRoute },
  { path: "/vata", route: vataRoute },
  { path: "/season", route: seasonRoute },
  { path: "/driver", route: driverRoute },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
