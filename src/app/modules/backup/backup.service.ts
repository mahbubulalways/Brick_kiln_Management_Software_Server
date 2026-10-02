import fs from "fs/promises";
import path from "path";

import { prisma } from "../../../helpers/prisma";
import { TAuthUser } from "../../../interface/token";

const BACKUP_ROOT = path.join(process.cwd(), "uploads", "vata_backupfile");

const makeJsonSafe = (data: any): any => {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }

      if (
        value &&
        typeof value === "object" &&
        value.constructor?.name === "Decimal"
      ) {
        return value.toString();
      }

      return value;
    }),
  );
};

const sqlEscape = (value: string) => {
  return value.replace(/'/g, "''");
};

const sqlValue = (value: any): string => {
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

  if (
    value &&
    typeof value === "object" &&
    value.constructor?.name === "Decimal"
  ) {
    return String(value);
  }

  if (typeof value === "object") {
    return `'${sqlEscape(JSON.stringify(value))}'::jsonb`;
  }

  return `'${sqlEscape(String(value))}'`;
};

const generateInsertSql = (tableName: string, rows: any[]): string => {
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

const generateSqlBackup = (tables: Record<string, any[]>) => {
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

export const createVataBackupService = async (user: TAuthUser) => {
  const vataId = user.vataId;

  if (!vataId) {
    throw new Error("Vata ID পাওয়া যায়নি");
  }

  const vata = await prisma.vata.findUnique({
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

  const [
    users,
    loginHistories,
    classAndRates,
    challans,
    customers,
    ledgers,
    payments,
    cash,
    rounds,
    brickStockSummaries,
    stockBooks,
    goodsStockCategories,
    goodsStocks,
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
    smsWallet,
    smsRechargeHistories,
    vataSmsSettings,
    smsLogs,
    notifications,
    approvalRequests,
    activityLogs,
  ] = await Promise.all([
    prisma.user.findMany({
      where: {
        vataId,
      },
    }),

    prisma.loginHistory.findMany({
      where: {
        user: {
          vataId,
        },
      },
    }),

    prisma.classAndRate.findMany({
      where: {
        vataId,
      },
    }),

    prisma.challan.findMany({
      where: {
        vataId,
      },
    }),

    prisma.customer.findMany({
      where: {
        vataId,
      },
    }),

    prisma.ledger.findMany({
      where: {
        vataId,
      },
    }),

    prisma.payment.findMany({
      where: {
        vataId,
      },
    }),

    prisma.cash.findMany({
      where: {
        vataId,
      },
    }),

    prisma.round.findMany({
      where: {
        vataId,
      },
    }),

    prisma.brickStockSummary.findMany({
      where: {
        vataId,
      },
    }),

    prisma.stockBook.findMany({
      where: {
        vataId,
      },
    }),

    prisma.goodsStockCategory.findMany({
      where: {
        vataId,
      },
    }),

    prisma.goodsStock.findMany({
      where: {
        vataId,
      },
    }),

    prisma.document.findMany({
      where: {
        vataId,
      },
    }),

    prisma.carRent.findMany({
      where: {
        vataId,
      },
    }),

    prisma.product.findMany({
      where: {
        vataId,
      },
    }),

    prisma.taskManager.findMany({
      where: {
        vataId,
      },
    }),

    prisma.receivablePayable.findMany({
      where: {
        vataId,
      },
    }),

    prisma.receivablePayableTransaction.findMany({
      where: {
        vataId,
      },
    }),

    prisma.contact.findMany({
      where: {
        vataId,
      },
    }),

    prisma.weather.findMany({
      where: {
        vataId,
      },
    }),

    prisma.subscriptionPayment.findMany({
      where: {
        vataId,
      },
    }),

    prisma.season.findMany({
      where: {
        vataId,
      },
    }),

    prisma.driver.findMany({
      where: {
        vataId,
      },
    }),

    prisma.vataCar.findMany({
      where: {
        vataId,
      },
    }),

    prisma.smsWallet.findUnique({
      where: {
        vataId,
      },
    }),

    prisma.smsRechargeHistory.findMany({
      where: {
        vataId,
      },
    }),

    prisma.vataSmsSettings.findUnique({
      where: {
        vataId,
      },
    }),

    prisma.smsLog.findMany({
      where: {
        vataId,
      },
    }),

    prisma.notification.findMany({
      where: {
        vataId,
      },
    }),

    prisma.approvalRequest.findMany({
      where: {
        vataId,
      },
    }),

    prisma.activityLog.findMany({
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

  const [
    challanItems,
    customerDues,
    dueCollections,
    deliveries,
    loadInfos,
    unloads,
    goodsIssues,
    goodHistoryLogs,
    goodsLosses,
  ] = await Promise.all([
    prisma.challanItem.findMany({
      where: {
        challanId: {
          in: challanIds,
        },
      },
    }),

    prisma.customerDue.findMany({
      where: {
        challanId: {
          in: challanIds,
        },
      },
    }),

    prisma.due_Collection.findMany({
      where: {
        customerId: {
          in: customerIds,
        },
      },
    }),

    prisma.delivery.findMany({
      where: {
        invoice: {
          vataId,
        },
      },
    }),

    prisma.loadInfo.findMany({
      where: {
        roundId: {
          in: roundIds,
        },
      },
    }),

    prisma.unload.findMany({
      where: {
        roundId: {
          in: roundIds,
        },
      },
    }),

    prisma.goodsIssue.findMany({
      where: {
        goodId: {
          in: goodsStockIds,
        },
      },
    }),

    prisma.goodHistoryLog.findMany({
      where: {
        goodId: {
          in: goodsStockIds,
        },
      },
    }),

    prisma.goodsLoss.findMany({
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

  const [deliveryStatusActionTimes, carIncomeDeliveries, unloadItems] =
    await Promise.all([
      prisma.deliveryStatusActionTime.findMany({
        where: {
          deliveryId: {
            in: deliveryIds,
          },
        },
      }),

      prisma.carIncomeDelivery.findMany({
        where: {
          deliveryId: {
            in: deliveryIds,
          },
        },
      }),

      prisma.unloadItem.findMany({
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

  const tables: Record<string, any[]> = {
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

  const vataBackupDirectory = path.join(BACKUP_ROOT, vata.vataId);

  // পুরাতন backup delete
  await fs.rm(vataBackupDirectory, {
    recursive: true,
    force: true,
  });

  // নতুন directory
  await fs.mkdir(vataBackupDirectory, {
    recursive: true,
  });

  const jsonFileName = `vata_${vata.vataId}_backup.json`;

  const sqlFileName = `vata_${vata.vataId}_backup.sql`;

  const jsonFilePath = path.join(vataBackupDirectory, jsonFileName);

  const sqlFilePath = path.join(vataBackupDirectory, sqlFileName);

  // --------------------------------------------------
  // Save files
  // --------------------------------------------------

  await fs.writeFile(jsonFilePath, jsonContent, "utf-8");

  await fs.writeFile(sqlFilePath, sqlContent, "utf-8");

  // --------------------------------------------------
  // File size
  // --------------------------------------------------

  const jsonStat = await fs.stat(jsonFilePath);

  const sqlStat = await fs.stat(sqlFilePath);

  // --------------------------------------------------
  // Table count
  // --------------------------------------------------

  const tableRowCounts: Record<string, number> = {};

  for (const [tableName, rows] of Object.entries(tables)) {
    tableRowCounts[tableName] = rows.length;
  }

  const tableCount = Object.keys(tables).length;

  const totalRowCount = Object.values(tableRowCounts).reduce(
    (total, count) => total + count,
    0,
  );

  // --------------------------------------------------
  // Save metadata
  // --------------------------------------------------

  const backup = await prisma.vataBackup.upsert({
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

// GET BACKUP
export const getVataBackupService = async (user: TAuthUser) => {
  const vataId = user.vataId;
  if (!vataId) {
    throw new Error("Vata ID পাওয়া যায়নি");
  }
  const backup = await prisma.vataBackup.findUnique({
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

export const VataBackupService = {
  createVataBackupService,
  getVataBackupService,
};
