"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetaConfig = void 0;
const createMetaConfig = ({ page, limit, totalData, }) => {
    return {
        page,
        limit,
        totalPages: Math.ceil(totalData / limit),
        totalData,
    };
};
exports.createMetaConfig = createMetaConfig;
