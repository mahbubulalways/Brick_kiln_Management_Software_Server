export type TRefundForm = {
    name: string;
    goodQuantity: number;
    damagedQuantity: number;
    lostQuantity: number;
    date: string;
    note: string;
    file: File | null;
    issueId:string
};