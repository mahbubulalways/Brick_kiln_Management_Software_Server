"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptHelper = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (pass) => {
    const saltRounds = 12;
    return await bcrypt_1.default.hash(pass, saltRounds);
};
const comparePassword = async (pass, hashedPassword) => {
    return await bcrypt_1.default.compare(pass, hashedPassword);
};
exports.bcryptHelper = {
    hashPassword,
    comparePassword,
};
//# sourceMappingURL=bcryptHelper.js.map