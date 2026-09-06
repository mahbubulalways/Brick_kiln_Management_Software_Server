export interface TLoadInfo {
    date: Date;
    round: string;
    quantity: number;
    loadType:
    | "RAWENTRY"
    | "RAW_TO_FIELD"
    | "FIELD_TO_CHULLI"
    | "STOCK_TO_CHULLI"
    | "CHULLI_TO_FINISHED"
    | "FIELD_TO_STOCK";
    classId: string | null
}