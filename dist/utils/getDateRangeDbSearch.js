"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeDbSearch = void 0;
const getDateRangeDbSearch = (dateValue) => {
    if (!dateValue) {
        return undefined;
    }
    const [startDateString, endDateString] = dateValue.split("_");
    const dateRange = {};
    // ==========================================
    // START DATE
    // ==========================================
    if (startDateString) {
        const [year, month, day] = startDateString
            .split("-")
            .map(Number);
        if (year && month && day) {
            // Bangladesh 00:00
            // = Previous day 18:00 UTC
            dateRange.gte = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - 6 * 60 * 60 * 1000);
        }
    }
    // ==========================================
    // END DATE
    // ==========================================
    if (endDateString) {
        const [year, month, day] = endDateString
            .split("-")
            .map(Number);
        if (year && month && day) {
            // Bangladesh 23:59:59.999
            // = Same day 17:59:59.999 UTC
            dateRange.lte = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999) - 6 * 60 * 60 * 1000);
        }
    }
    // ==========================================
    // SINGLE DATE
    // ==========================================
    if (startDateString && !endDateString) {
        const [year, month, day] = startDateString
            .split("-")
            .map(Number);
        if (year && month && day) {
            dateRange.lte = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999) - 6 * 60 * 60 * 1000);
        }
    }
    return Object.keys(dateRange).length > 0
        ? dateRange
        : undefined;
};
exports.getDateRangeDbSearch = getDateRangeDbSearch;
