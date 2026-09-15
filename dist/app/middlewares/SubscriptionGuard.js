"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const prisma_1 = require("../../helpers/prisma");
const ApplicationError_1 = require("../errors/ApplicationError");
const SubscriptionGuard = (0, catchAsync_1.default)(async (req, _res, next) => {
    const user = req.user;
    if (!user?.vataId) {
        return next();
    }
    const vata = await prisma_1.prisma.vata.findUnique({
        where: {
            vataId: user.vataId,
        },
        select: {
            subscriptionEnd: true,
        },
    });
    if (!vata?.subscriptionEnd) {
        return next();
    }
    const isExpired = new Date(vata.subscriptionEnd).getTime() < Date.now();
    if (!isExpired) {
        return next();
    }
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.FORBIDDEN, "আপনার সাবস্ক্রিপশনের মেয়াদ শেষ হয়েছে। সাবস্ক্রিপশন নবায়ন করুন।");
    }
    next();
});
exports.default = SubscriptionGuard;
