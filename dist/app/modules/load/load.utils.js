"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBrickStock = exports.checkAvailableBrick = void 0;
const http_status_codes_1 = require("http-status-codes");
const enums_1 = require("../../../generated/prisma/enums");
const ApplicationError_1 = require("../../errors/ApplicationError");
const toBanglaNumber_1 = require("../../../utils/toBanglaNumber");
const checkAvailableBrick = async (tx, vataId, loadType, quantity) => {
    // --------------------------------
    // GET OR CREATE BRICK SUMMARY
    // --------------------------------
    let brickSummary = await tx.brickStockSummary.findFirst({
        where: {
            vataId,
        },
    });
    if (!brickSummary) {
        brickSummary = await tx.brickStockSummary.create({
            data: {
                vataId,
                rawBrick: 0,
                fieldBrick: 0,
                stockBrick: 0,
                chulliBrick: 0,
            },
        });
    }
    // --------------------------------
    // SOURCE STOCK CONFIG
    // --------------------------------
    const sourceConfig = {
        [enums_1.LoadType.RAW_TO_FIELD]: {
            field: "rawBrick",
            message: "পর্যাপ্ত কাঁচা ইট নেই।",
        },
        [enums_1.LoadType.FIELD_TO_CHULLI]: {
            field: "fieldBrick",
            message: "মাঠে পর্যাপ্ত ইট নেই।",
        },
        [enums_1.LoadType.FIELD_TO_STOCK]: {
            field: "fieldBrick",
            message: "মাঠে পর্যাপ্ত ইট নেই।",
        },
        [enums_1.LoadType.STOCK_TO_CHULLI]: {
            field: "stockBrick",
            message: "স্টকে পর্যাপ্ত ইট নেই।",
        },
        [enums_1.LoadType.CHULLI_TO_FINISHED]: {
            field: "chulliBrick",
            message: "চুল্লিতে পর্যাপ্ত ইট নেই।",
        },
    };
    const config = sourceConfig[loadType];
    // RAWENTRY এর কোনো source stock নেই
    if (!config) {
        return brickSummary;
    }
    // --------------------------------
    // CHECK AVAILABILITY
    // --------------------------------
    const currentStock = Number(brickSummary[config.field]);
    if (currentStock < quantity) {
        const stockName = config.field === "rawBrick"
            ? "কাঁচা"
            : config.field === "fieldBrick"
                ? "মাঠে"
                : config.field === "stockBrick"
                    ? "স্টকে"
                    : "চুল্লিতে";
        throw new ApplicationError_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, `${config.message} বর্তমানে ${stockName} ${(0, toBanglaNumber_1.toBanglaNumber)(currentStock)} টি ইট আছে।`);
    }
    return brickSummary;
};
exports.checkAvailableBrick = checkAvailableBrick;
// UPDATE SHORT FUNC
const updateBrickStock = async (tx, brickSummaryId, loadType, quantity, reverse = false) => {
    const multiplier = reverse ? -1 : 1;
    const movements = {
        [enums_1.LoadType.RAWENTRY]: {
            rawBrick: 1,
        },
        [enums_1.LoadType.RAW_TO_FIELD]: {
            rawBrick: -1,
            fieldBrick: 1,
        },
        [enums_1.LoadType.FIELD_TO_CHULLI]: {
            fieldBrick: -1,
            chulliBrick: 1,
        },
        [enums_1.LoadType.STOCK_TO_CHULLI]: {
            stockBrick: -1,
            chulliBrick: 1,
        },
        [enums_1.LoadType.FIELD_TO_STOCK]: {
            fieldBrick: -1,
            stockBrick: 1,
        },
        [enums_1.LoadType.CHULLI_TO_FINISHED]: {
            chulliBrick: -1,
            finishedBrick: 1,
        },
    };
    const movement = movements[loadType];
    if (!movement)
        return;
    const data = {};
    Object.entries(movement).forEach(([field, value]) => {
        const amount = value * quantity * multiplier;
        data[field] =
            amount >= 0
                ? { increment: amount }
                : { decrement: Math.abs(amount) };
    });
    await tx.brickStockSummary.update({
        where: {
            id: brickSummaryId,
        },
        data,
    });
};
exports.updateBrickStock = updateBrickStock;
