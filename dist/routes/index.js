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
const router = (0, express_1.Router)();
const applicationRoutes = [
    { path: "/class", route: classAndRate_route_1.default },
    { path: "/invoice", route: challan_route_1.default },
    { path: "/delivery", route: delivery_route_1.default },
    { path: "/due", route: due_collection_route_1.default },
    { path: "/auth", route: auth_route_1.default },
];
applicationRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
