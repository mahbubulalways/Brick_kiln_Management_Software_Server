"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../config");
const zod_1 = require("zod");
const handleZodError_1 = require("./handleZodError");
// import { handlePrismaError } from "./handlePrismaError";
const globalErrorHandler = (error, req, res, next) => {
    let message = error.message || "Something went wrong";
    let statusCode = error.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    // console.log(error instanceof Prisma.PrismaClientKnownRequestError);
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // if (error instanceof PrismaClientUnknownRequestError) {
    //   console.log(error);
    //   const simplifiedError = handlePrismaError(error);
    //   statusCode = simplifiedError.statusCode;
    //   message = simplifiedError.message;
    //   errorSources = simplifiedError.errorSources;
    // }
    res.status(statusCode).json({
        statusCode: statusCode,
        success: false,
        message: message,
        errorSources: errorSources,
        stack: config_1.Config.NODE_ENV === "development" && error.stack,
    });
};
exports.default = globalErrorHandler;
