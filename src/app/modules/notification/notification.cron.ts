import cron from "node-cron";
import { generateDailyNotifications } from "./notification.service";

const notificationCron = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        console.log("🔔 Daily notification cron started");

        await generateDailyNotifications();

        console.log("✅ Daily notification cron completed");
      } catch (error) {
        console.error("❌ Daily notification cron failed:", error);
      }
    },
    {
      timezone: "Asia/Dhaka",
    },
  );
};

export default notificationCron;
