"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const prisma_1 = require("./helpers/prisma");
let server;
const port = config_1.Config.PORT;
const checkDatabaseConnection = async () => {
    try {
        await prisma_1.prisma.$connect();
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Database connection failed:", error);
    }
};
async function main() {
    try {
        server = app_1.default.listen(port, async () => {
            await checkDatabaseConnection();
            console.log("Application is running on port 5000");
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
}
main();
process.on("unhandledRejection", (err) => {
    console.error("😈 unhandledRejection detected, shutting down...", err);
    if (server) {
        server.close(() => process.exit(1));
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", (err) => {
    console.error("😈 uncaughtException detected, shutting down...", err);
    process.exit(1);
});
