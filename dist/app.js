"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const http_status_codes_1 = require("http-status-codes");
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://itvata.vercel.app", "http://localhost:3000"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// Serve static files from root/uploads
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.json({
        status: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Server is under construction!",
    });
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
