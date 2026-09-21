"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVataSeasonService = void 0;
const prisma_1 = require("../../../helpers/prisma");
// CREATE SEASON
const createVataSeasonService = async (vataId) => {
    const currentYear = new Date().getFullYear();
    const seasons = Array.from({ length: 25 }, (_, index) => {
        const startYear = 2025 + index;
        const endYear = startYear + 1;
        return {
            name: `${startYear}-${endYear}`,
            startDate: new Date(`${startYear}-10-01T00:00:00.000Z`),
            endDate: new Date(`${endYear}-09-30T23:59:59.999Z`),
            isActive: startYear === currentYear,
            vataId: vataId,
        };
    });
    const result = await prisma_1.prisma.season.createMany({
        data: seasons,
        skipDuplicates: true,
    });
    return result;
};
exports.createVataSeasonService = createVataSeasonService;
