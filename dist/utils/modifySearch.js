"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifySearch = void 0;
const modifySearch = ({ search, stringFields = [], numberFields = [], enumFields = [], dateFields = [], }) => {
    const or = [];
    const and = [];
    // =========================
    // SEARCH
    // =========================
    if (search) {
        // =========================
        // STRING
        // =========================
        stringFields.forEach((field) => {
            or.push({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            });
        });
        // =========================
        // NUMBER
        // =========================
        const num = Number(search);
        if (!Number.isNaN(num)) {
            numberFields.forEach((field) => {
                or.push({
                    [field]: num,
                });
            });
        }
        // =========================
        // ENUM
        // =========================
        const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
        enumFields.forEach(({ field, values }) => {
            const searchValue = normalize(search);
            const matched = values.filter((value) => normalize(String(value)).includes(searchValue));
            matched.forEach((value) => {
                or.push({
                    [field]: {
                        equals: value,
                    },
                });
            });
        });
    }
    // =========================
    // ADD SEARCH OR CONDITIONS
    // =========================
    if (or.length) {
        and.push({
            OR: or,
        });
    }
    // =========================
    // DATE RANGE
    // =========================
    // dateFields.forEach(({ field, startDate, endDate }) => {
    //   const start = new Date(startDate);
    //   // Invalid start date
    //   if (Number.isNaN(start.getTime())) {
    //     return;
    //   }
    //   // Start of start date
    //   start.setHours(0, 0, 0, 0);
    //   // =========================
    //   // ONLY START DATE
    //   // =========================
    //   if (!endDate) {
    //     const end = new Date(start);
    //     // End of same day
    //     end.setHours(23, 59, 59, 999);
    //     and.push({
    //       [field]: {
    //         gte: start,
    //         lte: end,
    //       },
    //     });
    //     return;
    //   }
    //   // =========================
    //   // START DATE + END DATE
    //   // =========================
    //   const end = new Date(endDate);
    //   // Invalid end date
    //   if (Number.isNaN(end.getTime())) {
    //     return;
    //   }
    //   // End of end date
    //   end.setHours(23, 59, 59, 999);
    //   and.push({
    //     [field]: {
    //       gte: start,
    //       lte: end,
    //     },
    //   });
    // });
    // console.log("Search Filter:", JSON.stringify(and, null, 2));
    // =========================
    // FINAL WHERE
    // =========================
    return and.length ? { AND: and } : {};
};
exports.modifySearch = modifySearch;
