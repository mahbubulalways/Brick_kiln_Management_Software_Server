import { Server } from "http";

import app from "./app";
import { Config } from "./config";
import { prisma } from "./helpers/prisma";
import { startPaymentReminderCron } from "./app/corn/paymentReminder.cron";
import notificationCron from "./app/corn/notificationCorn";
import databaseBackupCron from "./app/corn/databaseBackupCorn";

let server: Server;

const port = Config.PORT;

const RETRY_DELAY = 5000;

const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`
            SELECT 1
        `;

    console.log("✅ Database connected successfully");

    return true;
  } catch (error) {
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
    // startPaymentReminderCron();
    notificationCron();
    databaseBackupCron();
    server = app.listen(port, () => {
      console.log(`🚀 Application is running on port ${port}`);
    });
  } catch (error) {
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
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error("😈 uncaughtException detected, shutting down...", err);

  process.exit(1);
});
