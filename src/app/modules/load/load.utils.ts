import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../../generated/prisma/client";
import { LoadType } from "../../../generated/prisma/enums";
import { AppError } from "../../errors/ApplicationError";
import { toBanglaNumber } from "../../../utils/toBanglaNumber";

export const checkAvailableBrick = async (
    tx: Prisma.TransactionClient,
    vataId: string,
    loadType: LoadType,
    quantity: number
) => {
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

    const sourceConfig: Partial<
        Record<
            LoadType,
            {
                field: keyof typeof brickSummary;
                message: string;
            }
        >
    > = {
        [LoadType.RAW_TO_FIELD]: {
            field: "rawBrick",
            message: "পর্যাপ্ত কাঁচা ইট নেই।",
        },

        [LoadType.FIELD_TO_CHULLI]: {
            field: "fieldBrick",
            message: "মাঠে পর্যাপ্ত ইট নেই।",
        },

        [LoadType.FIELD_TO_STOCK]: {
            field: "fieldBrick",
            message: "মাঠে পর্যাপ্ত ইট নেই।",
        },

        [LoadType.STOCK_TO_CHULLI]: {
            field: "stockBrick",
            message: "স্টকে পর্যাপ্ত ইট নেই।",
        },

        [LoadType.CHULLI_TO_FINISHED]: {
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
        const stockName =
            config.field === "rawBrick"
                ? "কাঁচা"
                : config.field === "fieldBrick"
                  ? "মাঠে"
                  : config.field === "stockBrick"
                    ? "স্টকে"
                    : "চুল্লিতে";

        throw new AppError(
            StatusCodes.BAD_REQUEST,
            `${config.message} বর্তমানে ${stockName} ${toBanglaNumber(
                currentStock
            )} টি ইট আছে।`
        );
    }

    return brickSummary;
};


// UPDATE SHORT FUNC

export const updateBrickStock = async (
    tx: Prisma.TransactionClient,
    brickSummaryId: string,
    loadType: LoadType,
    quantity: number,
    reverse = false
) => {
    const multiplier = reverse ? -1 : 1;

    const movements: Record<
        LoadType,
        Record<string, number>
    > = {
        [LoadType.RAWENTRY]: {
            rawBrick: 1,
        },

        [LoadType.RAW_TO_FIELD]: {
            rawBrick: -1,
            fieldBrick: 1,
        },

        [LoadType.FIELD_TO_CHULLI]: {
            fieldBrick: -1,
            chulliBrick: 1,
        },

        [LoadType.STOCK_TO_CHULLI]: {
            stockBrick: -1,
            chulliBrick: 1,
        },

        [LoadType.FIELD_TO_STOCK]: {
            fieldBrick: -1,
            stockBrick: 1,
        },

        [LoadType.CHULLI_TO_FINISHED]: {
            chulliBrick: -1,
            finishedBrick: 1,
        },
    };

    const movement = movements[loadType];

    if (!movement) return;

    const data: Record<string, { increment: number } | { decrement: number }> =
        {};

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