"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const formatDate = (date) => {
    if (date) {
        return new Intl.DateTimeFormat("bn-BD", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    }
    else {
        return null;
    }
};
exports.formatDate = formatDate;
