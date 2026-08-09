"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeDbSearch = void 0;
const getDateRangeDbSearch = (dateValue) => {
    if (!dateValue)
        return undefined;
    const [startDateString, endDateString] = dateValue.split("_");
    const startDate = startDateString
        ? new Date(startDateString)
        : undefined;
    const endDate = endDateString
        ? new Date(endDateString)
        : undefined;
    const dateRange = {};
    // Start date
    if (startDate && !isNaN(startDate.getTime())) {
        startDate.setHours(0, 0, 0, 0);
        dateRange.gte = startDate;
    }
    // End date
    if (endDate && !isNaN(endDate.getTime())) {
        endDate.setHours(23, 59, 59, 999);
        dateRange.lte = endDate;
    }
    // শুধু একটি date দিলে পুরো দিনটা ধরবে
    if (startDate &&
        !isNaN(startDate.getTime()) &&
        !endDateString) {
        const fullDayEnd = new Date(startDate);
        fullDayEnd.setHours(23, 59, 59, 999);
        dateRange.lte = fullDayEnd;
    }
    return Object.keys(dateRange).length > 0
        ? dateRange
        : undefined;
};
exports.getDateRangeDbSearch = getDateRangeDbSearch;
