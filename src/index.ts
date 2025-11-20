import { Server } from "http";
import app from "./app";
import { Config } from "./config";

let server: Server;
const port = Config.PORT;
async function main() {
  try {
    server = app.listen(port, () => {
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
