"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
const generateCode = (count) => {
    return `${String(count).padStart(3, "0")}`;
};
exports.generateCode = generateCode;
