"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaError = void 0;
const handlePrismaError = (err) => {
    const errorSources = [];
    let message = "Database error";
    const statusCode = 400;
    // Handle unique constraint violation
    if (err.code === "P2002") {
        const fields = Array.isArray(err.meta?.target)
            ? err.meta?.target
            : [err.meta?.target];
        fields.forEach((field) => {
            errorSources.push({
                path: field,
                message: `The value for "${field}" already exists.`,
            });
        });
        message = "Unique constraint violation";
    }
    // Optional: handle other Prisma errors
    else {
        errorSources.push({
            path: "",
            message: err.message,
        });
    }
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.handlePrismaError = handlePrismaError;
//# sourceMappingURL=handlePrismaError.js.map