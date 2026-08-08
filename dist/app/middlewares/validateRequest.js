"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const ApplicationError_1 = require("../errors/ApplicationError");
const VALIDATE_REQUEST = (payload) => {
    return async (req, res, next) => {
        const body = req.body;
        if (!body) {
            throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Credentials are required.");
        }
        try {
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = VALIDATE_REQUEST;
