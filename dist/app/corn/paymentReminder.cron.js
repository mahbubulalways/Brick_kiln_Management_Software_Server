"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPaymentReminderCron = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const startPaymentReminderCron = () => {
    node_cron_1.default.schedule("* * * * *", async () => {
        console.log("Payment reminder cron started");
        try {
            console.log("Payment reminder cron is working...");
            console.log("Payment reminder cron completed");
        }
        catch (error) {
            console.error("Payment reminder cron error:", error);
        }
    }, {
        timezone: "Asia/Dhaka",
    });
};
exports.startPaymentReminderCron = startPaymentReminderCron;
