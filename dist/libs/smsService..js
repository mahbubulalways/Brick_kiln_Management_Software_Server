"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
require("dotenv/config");
const mram_error_1 = require("./mram.error");
const API_KEY = process.env.MRAM_API_KEY || "C400029569ea28f0960e05.66770939";
const SENDER_ID = process.env.MRAM_SENDER_ID || "C400029569ea28f0960e05.66770939";
const BASE_URL = process.env.MRAM_BASE_URL || "https://msg.mram.com.bd/smsapi";
const normalizeNumber = (number) => {
    const digits = String(number).replace(/\D/g, "");
    if (digits.startsWith("880") && digits.length === 13) {
        return digits;
    }
    if (digits.startsWith("01") && digits.length === 11) {
        return `88${digits}`;
    }
    if (digits.startsWith("1") && digits.length === 10) {
        return `880${digits}`;
    }
    return digits;
};
const sendSms = async (phones, message, options) => {
    // Input validation
    if (!phones || (Array.isArray(phones) && phones.length === 0)) {
        throw new Error("Phone number is required");
    }
    if (!message?.trim()) {
        throw new Error("Message is required");
    }
    // Normalize numbers and join with '+' as required by API docs
    const phoneList = Array.isArray(phones) ? phones : [phones];
    const validPhones = phoneList
        .map((phone) => normalizeNumber(phone))
        .filter((phone) => phone.length > 0);
    if (validPhones.length === 0) {
        throw new Error("No valid phone number found");
    }
    const contacts = validPhones.join("+");
    // Auto detect Bangla (Unicode) characters
    const isUnicode = /[\u0980-\u09FF]/.test(message);
    const smsType = options?.type || (isUnicode ? "unicode" : "text");
    const label = options?.label || "transactional";
    // Build URL with Query Parameters according to the image documentation
    const queryParams = new URLSearchParams({
        api_key: API_KEY,
        type: smsType,
        contacts: contacts,
        senderid: SENDER_ID,
        msg: message.trim(),
        label: label,
    });
    const requestUrl = `${BASE_URL}?${queryParams.toString()}`;
    // API Request (URL Params)
    let response;
    try {
        response = await fetch(requestUrl, {
            method: "GET", // Or POST based on endpoint support
            headers: {
                Accept: "application/json",
            },
        });
    }
    catch (error) {
        throw new Error(error instanceof Error
            ? `MRAM API request failed: ${error.message}`
            : "MRAM API request failed");
    }
    // Parse Response
    const rawResponse = await response.text();
    let data;
    try {
        data = JSON.parse(rawResponse);
    }
    catch {
        data = rawResponse;
    }
    // Error Checking
    const mramError = (0, mram_error_1.resolveMramError)(data);
    if (mramError) {
        throw new Error(`MRAM Error ${mramError.code}: ${mramError.message}`);
    }
    if (!response.ok) {
        throw new Error(`Failed to send SMS. HTTP ${response.status}`);
    }
    return data;
};
exports.sendSms = sendSms;
