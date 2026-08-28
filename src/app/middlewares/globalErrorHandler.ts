import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Config } from "../../config";
import { ZodError } from "zod";


import { IErrorSources } from "../../interface/error";
import { handleZodError } from "./handleZodError";
import { Prisma } from "../../generated/prisma/client";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = error.message || "Something went wrong";
  let statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  let errorSources: IErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // ================================
  // Zod Error
  // ================================
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // ================================
  // Prisma Known Request Error
  // ================================
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("Prisma Known Error:", error);

    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
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
  else if (error instanceof Prisma.PrismaClientValidationError) {
    console.error("Prisma Validation Error:", error);

    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
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
  else if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error("Prisma Initialization Error:", error);

    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
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
  else if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error("Prisma Rust Panic Error:", error);

    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
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
    ...(Config.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};

export default globalErrorHandler;