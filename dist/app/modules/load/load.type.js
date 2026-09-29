"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovementTypeEnglish = exports.getMovementTypeBangla = void 0;
const getMovementTypeBangla = (type) => {
    const typeMap = {
        RAWENTRY: "কাঁচা ইট এন্ট্রি",
        FIELD_TO_CHULLI: "মাঠ থেকে চুল্লিতে",
        STOCK_TO_CHULLI: "স্টক থেকে চুল্লিতে",
        CHULLI_TO_FINISHED: "চুল্লি থেকে পাকা ইটে",
        FIELD_TO_STOCK: "মাঠ থেকে স্টকে",
        RAW_TO_FIELD: "কাঁচা ইট মাঠে",
    };
    return typeMap[type] || type;
};
exports.getMovementTypeBangla = getMovementTypeBangla;
const getMovementTypeEnglish = (type) => {
    const typeMap = {
        "কাঁচা ইট এন্ট্রি": "RAWENTRY",
        "মাঠ থেকে চুল্লিতে": "FIELD_TO_CHULLI",
        "স্টক থেকে চুল্লিতে": "STOCK_TO_CHULLI",
        "চুল্লি থেকে পাকা ইটে": "CHULLI_TO_FINISHED",
        "মাঠ থেকে স্টকে": "FIELD_TO_STOCK",
        "কাঁচা ইট মাঠে": "RAW_TO_FIELD",
    };
    return typeMap[type] || type;
};
exports.getMovementTypeEnglish = getMovementTypeEnglish;
