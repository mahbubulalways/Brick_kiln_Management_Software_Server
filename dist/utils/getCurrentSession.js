"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentSession = void 0;
const getCurrentSession = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear % 100;
    const endYear = (currentYear + 1) % 100;
    return `${startYear.toString().padStart(2, "0")}-${endYear
        .toString()
        .padStart(2, "0")}`;
};
exports.getCurrentSession = getCurrentSession;
