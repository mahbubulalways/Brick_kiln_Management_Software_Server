"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VataBackupService = exports.getVataBackupService = exports.createVataBackupService = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../../../helpers/prisma");
const BACKUP_ROOT = path_1.default.join(process.cwd(), "uploads", "vata_backupfile");
const makeJsonSafe = (data) => {
    return JSON.parse(JSON.stringify(data, (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        if (value &&
            typeof value === "object" &&
            value.constructor?.name === "Decimal") {
            return value.toString();
        }
        return value;
    }));
};
const sqlEscape = (value) => {
    return value.replace(/'/g, "''");
};
const sqlValue = (value) => {
    if (value === null || value === undefined) {
        return "NULL";
    }
    if (typeof value === "bigint") {
        return value.toString();
    }
    if (value instanceof Date) {
        return `'${sqlEscape(value.toISOString())}'`;
    }
    if (typeof value === "boolean") {
        return value ? "TRUE" : "FALSE";
    }
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            return "NULL";
        }
        return String(value);
    }
    if (value &&
        typeof value === "object" &&
        value.constructor?.name === "Decimal") {
        return String(value);
    }
    if (typeof value === "object") {
        return `'${sqlEscape(JSON.stringify(value))}'::jsonb`;
    }
    return `'${sqlEscape(String(value))}'`;
};
const generateInsertSql = (tableName, rows) => {
    if (!rows.length) {
        return "";
    }
    const columns = Object.keys(rows[0]);
    const quotedColumns = columns.map((column) => `"${column}"`).join(", ");
    const values = rows
        .map((row) => {
        const rowValues = columns
            .map((column) => sqlValue(row[column]))
            .join(", ");
        return `(${rowValues})`;
    })
        .join(",\n");
    return `INSERT INTO "${tableName}" (${quotedColumns}) VALUES\n${values};\n`;
};
const generateSqlBackup = (tables) => {
    let sql = "";
    sql += `-- Vata Backup\n`;
    sql += `-- Generated: ${new Date().toISOString()}\n`;
    sql += `-- This backup contains only Vata-specific data.\n\n`;
    sql += `BEGIN;\n\n`;
    for (const [tableName, rows] of Object.entries(tables)) {
        if (!rows.length) {
            continue;
        }
        sql += `-- ${tableName}\n`;
        sql += generateInsertSql(tableName, rows);
        sql += `\n`;
    }
    sql += `COMMIT;\n`;
    return sql;
};
const createVataBackupService = async (user) => {
    const vataId = user.vataId;
    if (!vataId) {
        throw new Error("Vata ID পাওয়া যায়নি");
    }
    const vata = await prisma_1.prisma.vata.findUnique({
        where: {
            id: vataId,
        },
    });
    if (!vata) {
        throw new Error("Vata পাওয়া যায়নি");
    }
    // --------------------------------------------------
    // Direct Vata IDs
    // --------------------------------------------------
    const [users, loginHistories, classAndRates, challans, customers, ledgers, payments, cash, rounds, brickStockSummaries, stockBooks, goodsStockCategories, goodsStocks, documents, carRents, products, taskManagers, receivablePayables, receivablePayableTransactions, contacts, weather, subscriptionPayments, seasons, drivers, vataCars, smsWallet, smsRechargeHistories, vataSmsSettings, smsLogs, notifications, approvalRequests, activityLogs,] = await Promise.all([
        prisma_1.prisma.user.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.loginHistory.findMany({
            where: {
                user: {
                    vataId,
                },
            },
        }),
        prisma_1.prisma.classAndRate.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.challan.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.customer.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.ledger.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.payment.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.cash.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.round.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.brickStockSummary.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.stockBook.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.goodsStockCategory.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.goodsStock.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.document.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.carRent.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.product.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.taskManager.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.receivablePayable.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.receivablePayableTransaction.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.contact.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.weather.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.subscriptionPayment.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.season.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.driver.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.vataCar.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.smsWallet.findUnique({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.smsRechargeHistory.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.vataSmsSettings.findUnique({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.smsLog.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.notification.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.approvalRequest.findMany({
            where: {
                vataId,
            },
        }),
        prisma_1.prisma.activityLog.findMany({
            where: {
                vataId,
            },
        }),
    ]);
    // --------------------------------------------------
    // IDs
    // --------------------------------------------------
    const challanIds = challans.map((item) => item.id);
    const customerIds = customers.map((item) => item.id);
    const roundIds = rounds.map((item) => item.id);
    const goodsStockIds = goodsStocks.map((item) => item.id);
    // --------------------------------------------------
    // Indirect relations
    // --------------------------------------------------
    const [challanItems, customerDues, dueCollections, deliveries, loadInfos, unloads, goodsIssues, goodHistoryLogs, goodsLosses,] = await Promise.all([
        prisma_1.prisma.challanItem.findMany({
            where: {
                challanId: {
                    in: challanIds,
                },
            },
        }),
        prisma_1.prisma.customerDue.findMany({
            where: {
                challanId: {
                    in: challanIds,
                },
            },
        }),
        prisma_1.prisma.due_Collection.findMany({
            where: {
                customerId: {
                    in: customerIds,
                },
            },
        }),
        prisma_1.prisma.delivery.findMany({
            where: {
                invoice: {
                    vataId,
                },
            },
        }),
        prisma_1.prisma.loadInfo.findMany({
            where: {
                roundId: {
                    in: roundIds,
                },
            },
        }),
        prisma_1.prisma.unload.findMany({
            where: {
                roundId: {
                    in: roundIds,
                },
            },
        }),
        prisma_1.prisma.goodsIssue.findMany({
            where: {
                goodId: {
                    in: goodsStockIds,
                },
            },
        }),
        prisma_1.prisma.goodHistoryLog.findMany({
            where: {
                goodId: {
                    in: goodsStockIds,
                },
            },
        }),
        prisma_1.prisma.goodsLoss.findMany({
            where: {
                goodId: {
                    in: goodsStockIds,
                },
            },
        }),
    ]);
    // --------------------------------------------------
    // Delivery / Unload IDs
    // --------------------------------------------------
    const deliveryIds = deliveries.map((item) => item.id);
    const unloadIds = unloads.map((item) => item.id);
    // --------------------------------------------------
    // Delivery / Unload relations
    // --------------------------------------------------
    const [deliveryStatusActionTimes, carIncomeDeliveries, unloadItems] = await Promise.all([
        prisma_1.prisma.deliveryStatusActionTime.findMany({
            where: {
                deliveryId: {
                    in: deliveryIds,
                },
            },
        }),
        prisma_1.prisma.carIncomeDelivery.findMany({
            where: {
                deliveryId: {
                    in: deliveryIds,
                },
            },
        }),
        prisma_1.prisma.unloadItem.findMany({
            where: {
                unloadId: {
                    in: unloadIds,
                },
            },
        }),
    ]);
    // --------------------------------------------------
    // Backup tables
    // --------------------------------------------------
    const tables = {
        Vata: [vata],
        users,
        login_histories: loginHistories,
        classAndRates,
        challans,
        challanItems,
        customers,
        customerDues,
        dueCollections,
        deliveries,
        deliveryStatusActionTimes,
        carIncomeDeliveries,
        ledgers,
        payments,
        cash,
        rounds,
        loadInfos,
        unloads,
        unloadItems,
        brickStockSummaries,
        stockBooks,
        goodsStockCategories,
        goodsStocks,
        goodsIssues,
        goodHistoryLogs,
        goodsLosses,
        documents,
        carRents,
        products,
        taskManagers,
        receivablePayables,
        receivablePayableTransactions,
        contacts,
        weather,
        subscriptionPayments,
        seasons,
        drivers,
        vataCars,
        smsWallet: smsWallet ? [smsWallet] : [],
        smsRechargeHistories,
        vataSmsSettings: vataSmsSettings ? [vataSmsSettings] : [],
        smsLogs,
        notifications,
        approvalRequests,
        activityLogs,
    };
    // --------------------------------------------------
    // JSON backup
    // --------------------------------------------------
    const safeTables = makeJsonSafe(tables);
    const backupCreatedAt = new Date();
    const backupData = {
        vataId,
        vataName: vata.nameEnglish,
        createdAt: backupCreatedAt.toISOString(),
        tables: safeTables,
    };
    const jsonContent = JSON.stringify(backupData, null, 2);
    // --------------------------------------------------
    // SQL backup
    // --------------------------------------------------
    const sqlContent = generateSqlBackup(tables);
    // --------------------------------------------------
    // Backup directory
    // --------------------------------------------------
    const vataBackupDirectory = path_1.default.join(BACKUP_ROOT, vata.vataId);
    // পুরাতন backup delete
    await promises_1.default.rm(vataBackupDirectory, {
        recursive: true,
        force: true,
    });
    // নতুন directory
    await promises_1.default.mkdir(vataBackupDirectory, {
        recursive: true,
    });
    const jsonFileName = `vata_${vata.vataId}_backup.json`;
    const sqlFileName = `vata_${vata.vataId}_backup.sql`;
    const jsonFilePath = path_1.default.join(vataBackupDirectory, jsonFileName);
    const sqlFilePath = path_1.default.join(vataBackupDirectory, sqlFileName);
    // --------------------------------------------------
    // Save files
    // --------------------------------------------------
    await promises_1.default.writeFile(jsonFilePath, jsonContent, "utf-8");
    await promises_1.default.writeFile(sqlFilePath, sqlContent, "utf-8");
    // --------------------------------------------------
    // File size
    // --------------------------------------------------
    const jsonStat = await promises_1.default.stat(jsonFilePath);
    const sqlStat = await promises_1.default.stat(sqlFilePath);
    // --------------------------------------------------
    // Table count
    // --------------------------------------------------
    const tableRowCounts = {};
    for (const [tableName, rows] of Object.entries(tables)) {
        tableRowCounts[tableName] = rows.length;
    }
    const tableCount = Object.keys(tables).length;
    const totalRowCount = Object.values(tableRowCounts).reduce((total, count) => total + count, 0);
    // --------------------------------------------------
    // Save metadata
    // --------------------------------------------------
    const backup = await prisma_1.prisma.vataBackup.upsert({
        where: {
            vataId,
        },
        create: {
            vataId,
            backupData,
            jsonFileName,
            jsonFilePath,
            jsonFileSize: BigInt(jsonStat.size),
            sqlFileName,
            sqlFilePath,
            sqlFileSize: BigInt(sqlStat.size),
            tableCount,
            totalRowCount: BigInt(totalRowCount),
            tableRowCounts,
        },
        update: {
            backupData,
            jsonFileName,
            jsonFilePath,
            jsonFileSize: BigInt(jsonStat.size),
            sqlFileName,
            sqlFilePath,
            sqlFileSize: BigInt(sqlStat.size),
            tableCount,
            totalRowCount: BigInt(totalRowCount),
            tableRowCounts,
            createdAt: backupCreatedAt,
        },
    });
    // --------------------------------------------------
    // Response
    // --------------------------------------------------
    return {
        id: backup.id,
        vataId: backup.vataId,
        json: {
            fileName: backup.jsonFileName,
            filePath: backup.jsonFilePath,
            fileSize: backup.jsonFileSize?.toString(),
        },
        sql: {
            fileName: backup.sqlFileName,
            filePath: backup.sqlFilePath,
            fileSize: backup.sqlFileSize?.toString(),
        },
        tableCount: backup.tableCount,
        totalRowCount: backup.totalRowCount.toString(),
        createdAt: backup.createdAt,
    };
};
exports.createVataBackupService = createVataBackupService;
// GET BACKUP
const getVataBackupService = async (user) => {
    const vataId = user.vataId;
    if (!vataId) {
        throw new Error("Vata ID পাওয়া যায়নি");
    }
    const backup = await prisma_1.prisma.vataBackup.findUnique({
        where: { vataId },
        include: { vata: { select: { vataId: true, id: true } } },
    });
    if (!backup) {
        throw new Error("কোনো ব্যাকআপ পাওয়া যায়নি");
    }
    return {
        id: backup.id,
        vataId: backup.vataId,
        vataCode: backup.vata.vataId,
        json: {
            fileName: backup.jsonFileName,
            filePath: backup.jsonFilePath,
            fileSize: backup.jsonFileSize?.toString(),
        },
        sql: {
            fileName: backup.sqlFileName,
            filePath: backup.sqlFilePath,
            fileSize: backup.sqlFileSize?.toString(),
        },
        tableCount: backup.tableCount,
        totalRowCount: backup.totalRowCount.toString(),
        // tableRowCounts: backup.tableRowCounts,
        createdAt: backup.createdAt,
    };
};
exports.getVataBackupService = getVataBackupService;
exports.VataBackupService = {
    createVataBackupService: exports.createVataBackupService,
    getVataBackupService: exports.getVataBackupService,
};
