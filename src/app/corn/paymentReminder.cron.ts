import cron from "node-cron";

export const startPaymentReminderCron = () => {
  cron.schedule(
    "* * * * *",
    async () => {
      console.log("Payment reminder cron started");

      try {
        console.log("Payment reminder cron is working...");
        console.log("Payment reminder cron completed");
      } catch (error) {
        console.error("Payment reminder cron error:", error);
      }
    },
    {
      timezone: "Asia/Dhaka",
    },
  );
};
