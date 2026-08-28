"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../../helpers/prisma");
const season_controller_1 = require("./season.controller");
const AuthGuard_1 = __importDefault(require("../../middlewares/AuthGuard"));
const enums_1 = require("../../../generated/prisma/enums");
const router = (0, express_1.Router)();
const generateSeasons = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 25 }, (_, index) => {
        const startYear = 2025 + index;
        const endYear = startYear + 1;
        return {
            name: `${startYear}-${endYear}`,
            startDate: new Date(`${startYear}-10-01T00:00:00.000Z`),
            endDate: new Date(`${endYear}-09-30T23:59:59.999Z`),
            isActive: startYear === currentYear,
        };
    });
};
router.get("/create", async (req, res, next) => {
    try {
        const currentYear = new Date().getFullYear();
        const seasons = Array.from({ length: 25 }, (_, index) => {
            const startYear = 2025 + index;
            const endYear = startYear + 1;
            return {
                name: `${startYear}-${endYear}`,
                startDate: new Date(`${startYear}-10-01T00:00:00.000Z`),
                endDate: new Date(`${endYear}-09-30T23:59:59.999Z`),
                isActive: startYear === currentYear,
            };
        });
        const result = await prisma_1.prisma.season.createMany({
            data: seasons,
            skipDuplicates: true,
        });
        res.status(200).json({
            success: true,
            message: "Seasons created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
router.get("/", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), season_controller_1.SeasonController.getAllSeasons);
router.get("/active", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), season_controller_1.SeasonController.getActiveSeason);
router.patch("/select/:id", (0, AuthGuard_1.default)(enums_1.UserRole.OWNER, enums_1.UserRole.ADMIN, enums_1.UserRole.MANAGER), season_controller_1.SeasonController.changeActiveSeason);
exports.default = router;
