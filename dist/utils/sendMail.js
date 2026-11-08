"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config_1.Config.MAIL_SENDER_ADDRESS,
        pass: config_1.Config.MAIL_PASSWORD,
    },
});
const sendMail = async ({ receiver, subject, html }) => {
    const info = await transporter.sendMail({
        from: config_1.Config.MAIL_SENDER_ADDRESS,
        to: receiver,
        subject: subject,
        html: html,
    });
    return info;
};
exports.sendMail = sendMail;
