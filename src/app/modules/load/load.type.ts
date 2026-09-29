export const getMovementTypeBangla = (type: string) => {
  const typeMap: Record<string, string> = {
    RAWENTRY: "কাঁচা ইট এন্ট্রি",

    FIELD_TO_CHULLI: "মাঠ থেকে চুল্লিতে",

    STOCK_TO_CHULLI: "স্টক থেকে চুল্লিতে",

    CHULLI_TO_FINISHED: "চুল্লি থেকে পাকা ইটে",

    FIELD_TO_STOCK: "মাঠ থেকে স্টকে",
    RAW_TO_FIELD: "কাঁচা ইট মাঠে",
  };

  return typeMap[type] || type;
};

export const getMovementTypeEnglish = (type: string) => {
  const typeMap: Record<string, string> = {
    "কাঁচা ইট এন্ট্রি": "RAWENTRY",

    "মাঠ থেকে চুল্লিতে": "FIELD_TO_CHULLI",

    "স্টক থেকে চুল্লিতে": "STOCK_TO_CHULLI",

    "চুল্লি থেকে পাকা ইটে": "CHULLI_TO_FINISHED",

    "মাঠ থেকে স্টকে": "FIELD_TO_STOCK",

    "কাঁচা ইট মাঠে": "RAW_TO_FIELD",
  };

  return typeMap[type] || type;
};
