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
const RETRY_DELAY = 5000;
const checkDatabaseConnection = async () => {
    try {
        await prisma_1.prisma.$queryRaw `
            SELECT 1
        `;
        console.log("✅ Database connected successfully");
        return true;
    }
    catch (error) {
        console.error("❌ Database connection failed. Retrying in 5 seconds...");
        return false;
    }
};
const connectDatabaseWithRetry = async () => {
    while (true) {
        const isConnected = await checkDatabaseConnection();
        if (isConnected) {
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
};
async function main() {
    try {
        await connectDatabaseWithRetry();
        server = app_1.default.listen(port, () => {
            console.log(`🚀 Application is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
}
main();
process.on("unhandledRejection", (err) => {
    console.error("😈 unhandledRejection detected, shutting down...", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", (err) => {
    console.error("😈 uncaughtException detected, shutting down...", err);
    process.exit(1);
});
