export type TDueCollectionData = {
  customerCode: string;
  due: number;
  collect: number;
  newDue: number;
  season: string;
  nextDate: string | Date;
};