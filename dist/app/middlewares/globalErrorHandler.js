"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const config_1 = require("../../config");
const handleZodError_1 = require("./handleZodError");
const client_1 = require("../../generated/prisma/client");
const globalErrorHandler = (error, req, res, next) => {
    let message = error?.message || "Something went wrong";
    let statusCode = error?.statusCode ||
        http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    // ==========================================
    // ZOD ERROR
    // ==========================================
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // ==========================================
    // PRISMA KNOWN REQUEST ERROR
    // ==========================================
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma Known Error:", error);
        // ------------------------------------------
        // P2002 - Duplicate Data
        // ------------------------------------------
        if (error.code === "P2002") {
            statusCode = http_status_codes_1.StatusCodes.CONFLICT;
            message =
                "এই শ্রেণীর তথ্য ইতিমধ্যে বিদ্যমান";
            errorSources = [
                {
                    path: "",
                    message: "এই শ্রেণীর তথ্য ইতিমধ্যে বিদ্যমান",
                },
            ];
        }
        // ------------------------------------------
        // P2025 - Record Not Found
        // ------------------------------------------
        else if (error.code === "P2025") {
            statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
            message =
                "অনুরোধকৃত তথ্য খুঁজে পাওয়া যায়নি";
            errorSources = [
                {
                    path: "",
                    message: "অনুরোধকৃত তথ্য খুঁজে পাওয়া যায়নি",
                },
            ];
        }
        // ------------------------------------------
        // Other Prisma Errors
        // ------------------------------------------
        else {
            statusCode =
                http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
            message =
                "ডাটাবেজ সংক্রান্ত একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
            errorSources = [
                {
                    path: "",
                    message: "ডাটাবেজ সংক্রান্ত একটি সমস্যা হয়েছে।",
                },
            ];
        }
    }
    // ==========================================
    // PRISMA VALIDATION ERROR
    // ==========================================
    else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        console.error("Prisma Validation Error:", error);
        statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        message =
            "প্রদত্ত তথ্য সঠিক নয়। অনুগ্রহ করে তথ্যগুলো যাচাই করুন।";
        errorSources = [
            {
                path: "",
                message: "প্রদত্ত তথ্য সঠিক নয়।",
            },
        ];
    }
    // ==========================================
    // PRISMA INITIALIZATION ERROR
    // ==========================================
    else if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
        console.error("Prisma Initialization Error:", error);
        statusCode =
            http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message =
            "সার্ভারের সাথে ডাটাবেজ সংযোগ স্থাপন করতে সমস্যা হয়েছে।";
        errorSources = [
            {
                path: "",
                message: "সার্ভারের সাথে ডাটাবেজ সংযোগ স্থাপন করতে সমস্যা হয়েছে।",
            },
        ];
    }
    // ==========================================
    // PRISMA RUST PANIC ERROR
    // ==========================================
    else if (error instanceof client_1.Prisma.PrismaClientRustPanicError) {
        console.error("Prisma Rust Panic Error:", error);
        statusCode =
            http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        message =
            "সিস্টেমে একটি অভ্যন্তরীণ সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।";
        errorSources = [
            {
                path: "",
                message: "সিস্টেমে একটি অভ্যন্তরীণ সমস্যা হয়েছে।",
            },
        ];
    }
    // ==========================================
    // NORMAL APPLICATION ERROR
    // ==========================================
    else {
        console.error("========== GLOBAL ERROR ==========");
        console.error("Error:", error);
        console.error("Message:", error?.message);
        console.error("Stack:", error?.stack);
        console.error("==================================");
    }
    // ==========================================
    // RESPONSE
    // ==========================================
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
