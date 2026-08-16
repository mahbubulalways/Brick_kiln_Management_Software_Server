"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classAndRate_route_1 = __importDefault(require("../app/modules/classAndRate/classAndRate.route"));
const challan_route_1 = __importDefault(require("../app/modules/challan/challan.route"));
const delivery_route_1 = __importDefault(require("../app/modules/delivery/delivery.route"));
const due_collection_route_1 = __importDefault(require("../app/modules/due_collection/due_collection.route"));
const auth_route_1 = __importDefault(require("../app/modules/auth/auth.route"));
const ledger_route_1 = __importDefault(require("../app/modules/ledger/ledger.route"));
const payment_route_1 = __importDefault(require("../app/modules/payment/payment.route"));
const cash_route_1 = __importDefault(require("../app/modules/cash/cash.route"));
const load_route_1 = __importDefault(require("../app/modules/load/load.route"));
const round_route_1 = __importDefault(require("../app/modules/round/round.route"));
const unload_route_1 = __importDefault(require("../app/modules/unload/unload.route"));
const customer_route_1 = __importDefault(require("../app/modules/customer/customer.route"));
const report_route_1 = __importDefault(require("../app/modules/report/report.route"));
const document_route_1 = __importDefault(require("../app/modules/document/document.route"));
const car_rent_route_1 = __importDefault(require("../app/modules/car_rent/car_rent.route"));
const router = (0, express_1.Router)();
const applicationRoutes = [
    { path: "/class", route: classAndRate_route_1.default },
    { path: "/invoice", route: challan_route_1.default },
    { path: "/delivery", route: delivery_route_1.default },
    { path: "/due", route: due_collection_route_1.default },
    { path: "/auth", route: auth_route_1.default },
    { path: "/ledger", route: ledger_route_1.default },
    { path: "/payment", route: payment_route_1.default },
    { path: "/cash", route: cash_route_1.default },
    { path: "/load-info", route: load_route_1.default },
    { path: "/round", route: round_route_1.default },
    { path: "/unload", route: unload_route_1.default },
    { path: "/customer", route: customer_route_1.default },
    { path: "/report", route: report_route_1.default },
    { path: "/document", route: document_route_1.default },
    { path: "/car-rent", route: car_rent_route_1.default },
];
applicationRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
