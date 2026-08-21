export type TDelivery = {
  deliveryNo: number;
  invoiceId: string;
  deliveryDate: Date;
  nextDeliveryDate: Date;
  customer: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  items: {
    class: string;
    quantity: number;
    todaysDelivery: number;
    remainingDelivery: number;
  };
  itemId: string;
  carRent: number;
  driverName: string;
  driverMobileNumber: string;
  carNumber: string;
  note: string;
  savingType: string;
};
