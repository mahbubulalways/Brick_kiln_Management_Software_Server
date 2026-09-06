"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBanglaNumber = void 0;
const toBanglaNumber = (value) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(value).replace(/\d/g, (digit) => {
        return banglaDigits[Number(digit)];
    });
};
exports.toBanglaNumber = toBanglaNumber;
