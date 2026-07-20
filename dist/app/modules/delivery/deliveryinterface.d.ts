export type TDelivery = {
    deliveryNo: number;
    invoiceId: number;
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
    itemId: number;
    carRent: number;
    driverName: string;
    driverMobileNumber: string;
    carNumber: string;
    note: string;
    savingType: string;
};
//# sourceMappingURL=deliveryinterface.d.ts.map