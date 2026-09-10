export interface IPayment {
  ledger: string;
  paymentType: string;
  paymentDetails: string;
  quantity: number;
  rate: number;
  totalBill: number;
  cutting: number;
  payment: number;
  paymentDate: Date;
  paymentDifference: number;
  document: string | null;
  address: string;
}
