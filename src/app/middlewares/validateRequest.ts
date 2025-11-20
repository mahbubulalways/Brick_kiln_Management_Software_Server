import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/ApplicationError";

const VALIDATE_REQUEST = (payload: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    if (!body) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Credentials are required.");
    }
    try {
      await payload.parseAsync(body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default VALIDATE_REQUEST;
