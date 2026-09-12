"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateRange = void 0;
const formatDateRange = ({ start, end, }) => {
    const dateRange = `${String(start)}_${String(end)}`;
    if (!dateRange) {
        return "";
    }
    const [startDate, endDate] = dateRange.split("_");
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) {
            return "";
        }
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-");
    };
    const result = formatDate(startDate);
    if (!result) {
        return "";
    }
    if (endDate) {
        const end = formatDate(endDate);
        return end ? `${result}_${end}` : result;
    }
    return result;
};
exports.formatDateRange = formatDateRange;
