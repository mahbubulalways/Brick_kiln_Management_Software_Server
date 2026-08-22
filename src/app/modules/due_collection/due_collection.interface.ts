export type TDueCollectionData = {
  customerId: string;
  due: number;
  collect: number;
  newDue: number;
  season: string;
  nextDate: string | Date;
};