import { ModuleType } from "../../../generated/prisma/enums";

import { fieldNameMap } from "./approval.field";

const moduleNameMap: Record<ModuleType, string> = {
  USER: "ইউজার",
  LOGIN_HISTORY: "লগইন ইতিহাস",
  CLASS_RATE: "শ্রেণি ও রেট",
  CHALLAN: "চালান",
  CHALLAN_ITEM: "চালানের পণ্য",
  CUSTOMER: "কাস্টমার",
  CUSTOMER_DUE: "কাস্টমারের বাকি",
  DELIVERY: "ডেলিভারি",
  DELIVERY_STATUS_TIME: "ডেলিভারি স্ট্যাটাস",
  DUE: "বাকি আদায়",
  LEDGER: "খতিয়ান",
  PAYMENT: "পেমেন্ট",
  CASH: "ক্যাশ",
  ROUND: "রাউন্ড",
  LOAD_INFO: "লোড তথ্য",
  UNLOAD: "আনলোড",
  UNLOAD_ITEM: "আনলোড তথ্য",
  BRICK_STOCK_SUMMARY: "ইটের স্টক সারাংশ",
  STOCK: "স্টক",
  GOODS_STOCK_CATEGORY: "পণ্য স্টক ক্যাটাগরি",
  GOODS_STOCK: "পণ্য স্টক",
  GOODS_ISSUE: "পণ্য ইস্যু",
  GOOD_HISTORY_LOG: "পণ্যের ইতিহাস",
  GOODS_LOSS: "পণ্যের ক্ষতি",
  DOCUMENT: "ডকুমেন্ট",
  CAR_RENT: "গাড়ি ভাড়া",
  PRODUCT: "পণ্য",
  TASK: "টাস্ক",
  RECEIVABLE_PAYABLE: "পাওনা-দেনা",
  RECEIVABLE_PAYABLE_TRANSACTION: "পাওনা-দেনার লেনদেন",
  CONTACT: "যোগাযোগ",
  WEATHER: "আবহাওয়া",
  VATA: "ভাটা",
  SUBSCRIPTION_PLAN: "সাবস্ক্রিপশন প্ল্যান",
  SUBSCRIPTION_PAYMENT: "সাবস্ক্রিপশন পেমেন্ট",
  SEASON: "সিজন",
  DRIVER: "ড্রাইভার",
  VATA_CAR: "ভাটার গাড়ি",
  CAR_INCOME_DELIVERY: "গাড়ির আয়",
  SMS_SETTING: "SMS সেটিংস",
  SMS_WALLET: "SMS ওয়ালেট",
  SMS_RECHARGE_HISTORY: "SMS রিচার্জ ইতিহাস",
  VATA_SMS_SETTINGS: "ভাটার SMS সেটিংস",
  SMS_LOG: "SMS লগ",
  NOTE: "নোট",
  NOTIFICATION: "নোটিফিকেশন",
  FAQ: "FAQ",
  ABOUT_US: "আমাদের সম্পর্কে",
  HELP_LINE: "হেল্পলাইন",
  YOUTUBE_LINK: "YouTube লিংক",
  DATABASE_BACKUP_PERMISSION: "ডাটাবেজ ব্যাকআপ অনুমতি",
  DATABASE_BACKUP: "ডাটাবেজ ব্যাকআপ",
  APPROVAL_REQUEST: "অনুমোদনের অনুরোধ",
  ACTIVITY_LOG: "অ্যাক্টিভিটি লগ",
};

const isEmptyValue = (value: unknown) => {
  return value === null || value === undefined || value === "";
};

const formatActivityValue = (value: unknown): string => {
  if (isEmptyValue(value)) {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "হ্যাঁ" : "না";
  }

  if (Array.isArray(value)) {
    return `${value.length}টি`;
  }

  if (value instanceof Date) {
    return value.toLocaleDateString("bn-BD");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const isValueChanged = (oldValue: unknown, newValue: unknown) => {
  if (isEmptyValue(oldValue) && isEmptyValue(newValue)) {
    return false;
  }

  return JSON.stringify(oldValue) !== JSON.stringify(newValue);
};

const getFieldName = (module: ModuleType, key: string) => {
  return fieldNameMap?.[module]?.[key] || key;
};

const getReferenceName = (
  module: ModuleType,
  data: Record<string, unknown>,
  referenceNumber?: string | number,
) => {
  if (referenceNumber !== undefined && referenceNumber !== null) {
    return `${moduleNameMap[module]} #${referenceNumber}`;
  }

  if (module === "CUSTOMER") {
    return data.customerName || data.name
      ? `কাস্টমার "${data.customerName || data.name}"`
      : "কাস্টমার";
  }

  if (module === "CLASS_RATE") {
    return data.className ? `"${data.className}" শ্রেণী` : "শ্রেণি ও রেট";
  }

  if (module === "DRIVER") {
    return data.name ? `ড্রাইভার "${data.name}"` : "ড্রাইভার";
  }

  if (module === "CHALLAN") {
    return data.serial ? `চালান #${data.serial}` : "চালান";
  }

  return moduleNameMap[module];
};

const generateItemChanges = (oldItems: unknown[], newItems: unknown[]) => {
  const changes: string[] = [];

  const oldItemMap = new Map<string, Record<string, unknown>>();

  const newItemMap = new Map<string, Record<string, unknown>>();

  oldItems.forEach((item) => {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      const data = item as Record<string, unknown>;

      if (data.id !== undefined && data.id !== null) {
        oldItemMap.set(String(data.id), data);
      }
    }
  });

  newItems.forEach((item) => {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      const data = item as Record<string, unknown>;

      if (data.id !== undefined && data.id !== null) {
        newItemMap.set(String(data.id), data);
      }
    }
  });

  oldItemMap.forEach((oldItem, id) => {
    if (!newItemMap.has(id)) {
      const className = oldItem.class ? `"${oldItem.class}"` : "একটি";

      changes.push(`${className} পণ্য মুছে ফেলা হয়েছে`);

      return;
    }

    const newItem = newItemMap.get(id);

    if (!newItem) {
      return;
    }

    Object.keys(newItem).forEach((key) => {
      if (
        key === "id" ||
        key === "createdAt" ||
        key === "updatedAt" ||
        key === "challanId"
      ) {
        return;
      }

      const oldValue = oldItem[key];
      const newValue = newItem[key];

      if (!isValueChanged(oldValue, newValue)) {
        return;
      }

      const fieldName = getFieldName("CHALLAN_ITEM", key);

      changes.push(
        `পণ্যের ${fieldName} ${formatActivityValue(oldValue)} থেকে ${formatActivityValue(newValue)}`,
      );
    });
  });

  newItemMap.forEach((newItem, id) => {
    if (oldItemMap.has(id)) {
      return;
    }

    const className = newItem.class ? `"${newItem.class}"` : "নতুন";

    changes.push(`${className} পণ্য যোগ করা হয়েছে`);
  });

  return changes;
};

const generateNestedObjectChanges = (
  module: ModuleType,
  oldData: Record<string, unknown>,
  newData: Record<string, unknown>,
) => {
  const changes: string[] = [];

  Object.keys(newData).forEach((key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];

    if (!isValueChanged(oldValue, newValue)) {
      return;
    }

    if (
      oldValue &&
      newValue &&
      typeof oldValue === "object" &&
      typeof newValue === "object" &&
      !Array.isArray(oldValue) &&
      !Array.isArray(newValue)
    ) {
      const nestedChanges = generateNestedObjectChanges(
        module,
        oldValue as Record<string, unknown>,
        newValue as Record<string, unknown>,
      );

      changes.push(...nestedChanges);

      return;
    }

    const fieldName = getFieldName(module, key);

    changes.push(
      `${fieldName} ${formatActivityValue(oldValue)} থেকে ${formatActivityValue(newValue)}`,
    );
  });

  return changes;
};

export const generateActivityDescription = (
  module: ModuleType,
  action: "CREATE" | "UPDATE" | "DELETE",
  oldData: Record<string, unknown> | null,
  newData: Record<string, unknown> | null,
  referenceNumber?: string | number,
) => {
  const referenceData: Record<string, unknown> = {
    ...(oldData || {}),
    ...(newData || {}),
  };

  const referenceName = getReferenceName(
    module,
    referenceData,
    referenceNumber,
  );

  if (action === "CREATE") {
    return `${referenceName} তৈরি করা হয়েছে।`;
  }

  if (action === "DELETE") {
    return `${referenceName} মুছে ফেলা হয়েছে।`;
  }

  if (!oldData || !newData) {
    return `${referenceName} আপডেট করা হয়েছে।`;
  }

  const changes: string[] = [];

  Object.keys(newData).forEach((key) => {
    const oldValue = oldData[key];
    const newValue = newData[key];

    if (key === "items") {
      if (Array.isArray(oldValue) && Array.isArray(newValue)) {
        const itemChanges = generateItemChanges(oldValue, newValue);

        changes.push(...itemChanges);
      }

      return;
    }

    if (
      key === "invoice" &&
      oldValue &&
      newValue &&
      typeof oldValue === "object" &&
      typeof newValue === "object" &&
      !Array.isArray(oldValue) &&
      !Array.isArray(newValue)
    ) {
      const invoiceChanges = generateNestedObjectChanges(
        "CHALLAN",
        oldValue as Record<string, unknown>,
        newValue as Record<string, unknown>,
      );

      changes.push(...invoiceChanges);

      return;
    }

    if (
      oldValue &&
      newValue &&
      typeof oldValue === "object" &&
      typeof newValue === "object" &&
      !Array.isArray(oldValue) &&
      !Array.isArray(newValue)
    ) {
      const nestedChanges = generateNestedObjectChanges(
        module,
        oldValue as Record<string, unknown>,
        newValue as Record<string, unknown>,
      );

      changes.push(...nestedChanges);

      return;
    }

    if (!isValueChanged(oldValue, newValue)) {
      return;
    }

    const fieldName = getFieldName(module, key);

    changes.push(
      `${fieldName} ${formatActivityValue(oldValue)} থেকে ${formatActivityValue(newValue)}`,
    );
  });

  if (!changes.length) {
    return `${referenceName} আপডেট করা হয়েছে।`;
  }

  return `${referenceName} এর ${changes.join(", ")} পরিবর্তন করা হয়েছে।`;
};
