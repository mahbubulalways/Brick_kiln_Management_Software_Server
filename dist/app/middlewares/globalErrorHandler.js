"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../config");
const zod_1 = require("zod");
const handleZodError_1 = require("./handleZodError");
const client_1 = require("../../generated/prisma/client");
const globalErrorHandler = (error, req, res, next) => {
    let message = error.message || "Something went wrong";
    let statusCode = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    // ================================
    // Zod Error
    // ================================
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // ================================
    // Prisma Known Request Error
    // ================================
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma Known Error:", error);
        statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message = "ডাটাবেজ সংক্রান্ত একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
        errorSources = [
            {
                path: "",
                message: "ডাটাবেজ সংক্রান্ত একটি সমস্যা হয়েছে।",
            },
        ];
    }
    // ================================
    // Prisma Validation Error
    // ================================
    else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        console.error("Prisma Validation Error:", error);
        statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message = "ডাটা প্রসেস করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
        errorSources = [
            {
                path: "",
                message: "ডাটা প্রসেস করতে সমস্যা হয়েছে।",
            },
        ];
    }
    // ================================
    // Prisma Initialization Error
    // ================================
    else if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
        console.error("Prisma Initialization Error:", error);
        statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message = "সার্ভারের সাথে সংযোগ স্থাপন করতে সমস্যা হয়েছে।";
        errorSources = [
            {
                path: "",
                message: "সার্ভারের সাথে সংযোগ স্থাপন করতে সমস্যা হয়েছে।",
            },
        ];
    }
    // ================================
    // Prisma Rust Panic Error
    // ================================
    else if (error instanceof client_1.Prisma.PrismaClientRustPanicError) {
        console.error("Prisma Rust Panic Error:", error);
        statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message = "সিস্টেমে একটি অভ্যন্তরীণ সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
        errorSources = [
            {
                path: "",
                message: "সিস্টেমে একটি অভ্যন্তরীণ সমস্যা হয়েছে।",
            },
        ];
    }
    // ================================
    // Normal Application Error
    // ================================
    else {
        console.error("========== GLOBAL ERROR ==========");
        console.error("Error:", error);
        console.error("Message:", error?.message);
        console.error("Stack:", error?.stack);
        console.error("==================================");
    }
    res.status(statusCode).json({
        statusCode,
        success: false,
        message,
        errorSources,
        ...(config_1.Config.NODE_ENV === "development" && {
            stack: error.stack,
        }),
    });
};
exports.default = globalErrorHandler;
