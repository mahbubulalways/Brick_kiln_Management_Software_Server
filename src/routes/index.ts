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
import stockBookRoute from "../app/modules/stock_book/stock_book.route";
import goodsStockCategoryRouter from "../app/modules/goods_category/goods_category.route";
import goodStockRouter from "../app/modules/goods_stock/good_stock.route";
import goodIssueRouter from "../app/modules/good_issue/good_issue.route";
import goodIssueRefundRouter from "../app/modules/good_refund/good_refund.routes";
import subscriptionPaymentRouter from "../app/modules/subscription_payment/subscription_payment.route";
import vatacarRouter from "../app/modules/vata_car/vata_car.route";
import smsRouter from "../app/modules/sms/sms.route";
import vataSMsSettingRouter from "../app/modules/vata_sms_sittings/vata_sms_sittings.route";
import sendSmsRoute from "../app/modules/send_sms/send_sms.route";

// ADMIN MODULES
import adminRoutes from "../app/modules/system_modules/admin/admin.route";
import adminVataRoutes from "../app/modules/system_modules/vata/vata.route";
import subscriptionRoutes from "../app/modules/system_modules/subscriptions/subscriptions.route";
import smsRateRoutes from "../app/modules/system_modules/sms_rate/sms_rate.router";
import databaseRoutes from "../app/modules/system_modules/database/database.router";

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
  { path: "/stock-book", route: stockBookRoute },
  { path: "/goods-category", route: goodsStockCategoryRouter },
  { path: "/goods", route: goodStockRouter },
  { path: "/goods-issue", route: goodIssueRouter },
  { path: "/goods-issue-refund", route: goodIssueRefundRouter },
  { path: "/car", route: vatacarRouter },
  { path: "/subscription-payment", route: subscriptionPaymentRouter }, // vata + system
  { path: "/sms", route: smsRouter },
  { path: "/vata/sms-sittings", route: vataSMsSettingRouter },
  { path: "/vata/send-sms", route: sendSmsRoute },

  // ADMIN MODULES
  {
    path: "/system/admin",
    route: adminRoutes,
  },
  {
    path: "/system/vata",
    route: adminVataRoutes,
  },
  {
    path: "/system/subscription",
    route: subscriptionRoutes,
  },
  {
    path: "/system/sms",
    route: smsRateRoutes,
  },
  // {
  //   path: "/system/database",
  //   route: databaseRoutes,
  // },
];

applicationRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
