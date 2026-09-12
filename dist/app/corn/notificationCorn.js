"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const notification_service_1 = require("../modules/notification/notification.service");
const notificationCron = () => {
    node_cron_1.default.schedule("5 0 * * *", async () => {
        try {
            console.log("🔔 Daily notification started");
            await (0, notification_service_1.generateDailyNotifications)();
            console.log("✅ Daily notification completed");
        }
        catch (error) {
            console.error("❌ Daily notification failed:", error);
        }
    }, {
        timezone: "Asia/Dhaka",
    });
    console.log("⏰ Notification initialized — runs every day at 12:05 AM (Asia/Dhaka)");
};
exports.default = notificationCron;
