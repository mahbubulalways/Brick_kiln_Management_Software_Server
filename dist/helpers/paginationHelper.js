"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
    };
};
exports.paginationHelper = paginationHelper;
