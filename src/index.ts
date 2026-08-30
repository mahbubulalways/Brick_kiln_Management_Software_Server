import { Server } from "http";
import app from "./app";
import { Config } from "./config";
import { prisma } from "./helpers/prisma";

let server: Server;
const port = Config.PORT;

const checkDatabaseConnection = async () => {
  try {
    await prisma.$queryRaw`
  SELECT * FROM "users"
`;
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

async function main() {
  try {
    server = app.listen(port, async () => {
      await checkDatabaseConnection()
      console.log("Application is running on port 5000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}
main();
process.on("unhandledRejection", (err) => {
  console.error("😈 unhandledRejection detected, shutting down...", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", (err) => {
  console.error("😈 uncaughtException detected, shutting down...", err);
  process.exit(1);
});
