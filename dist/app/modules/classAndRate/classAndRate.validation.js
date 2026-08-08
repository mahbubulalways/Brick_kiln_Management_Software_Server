"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASS_AND_RATE_VALIDATION = void 0;
const zod_1 = require("zod");
exports.CLASS_AND_RATE_VALIDATION = zod_1.z.object({
    classType: zod_1.z
        .string({ error: "Class type is required" })
        .min(1, "Class type cannot be empty"),
    className: zod_1.z
        .string({ error: "Class name is required" })
        .min(1, "Class name cannot be empty"),
    rate: zod_1.z.number({ error: "Rate is required" }),
});
