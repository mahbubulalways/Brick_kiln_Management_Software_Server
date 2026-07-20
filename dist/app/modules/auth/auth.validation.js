"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_LOGIN_VALIDATION = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AUTH_LOGIN_VALIDATION = zod_1.default.object({
    data: zod_1.default.object({
        auth: zod_1.default.string({ error: "Email or phone number is required" }),
        password: zod_1.default.string({ error: "Password is required" }).min(8, {
            abort: true,
            message: "Password must be at least 8 characters",
        }),
    }),
});
//# sourceMappingURL=auth.validation.js.map