import cron from "node-cron";
import { generateDailyNotifications } from "../modules/notification/notification.service";

const notificationCron = () => {
  cron.schedule(
    "5 0 * * *",
    async () => {
      try {
        console.log("🔔 Daily notification started");

        await generateDailyNotifications();

        console.log("✅ Daily notification completed");
      } catch (error) {
        console.error("❌ Daily notification failed:", error);
      }
    },
    {
      timezone: "Asia/Dhaka",
    },
  );

  console.log(
    "⏰ Notification initialized — runs every day at 12:05 AM (Asia/Dhaka)",
  );
};

export default notificationCron;
