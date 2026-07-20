import { TDelivery } from "./deliveryinterface";
export declare const DeliveryService: {
    getNextDeliveryNo: () => Promise<number>;
    getDeliveryThatGoTodayService: (date: string) => Promise<{
        id: number;
        customer: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            address: string;
            phoneNumber: string;
            totalPurchased: number;
            totalPaid: number;
            nextPaymentDate: Date | null;
        };
        items: {
            id: number;
            rate: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            class: string;
            quantity: number;
            delivered: number;
            price: number;
            challanId: number;
            deliveryDate: Date;
        }[];
    }[]>;
    createDeliveryService: (payload: TDelivery) => Promise<{
        id: number;
        createdAt: Date;
        isDeleted: boolean;
        class: string;
        quantity: number;
        deliveryDate: Date;
        carRent: number | null;
        deliveryNo: number;
        nextDeliveryDate: Date | null;
        deliveryReceived: number;
        deliveryRemaining: number;
        driverName: string | null;
        driverPhoneNumber: string | null;
        carNo: string | null;
        invoiceId: number;
    }>;
    getTodaysDeliveryThatDone: (date: string) => Promise<({
        invoice: {
            customer: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                isDeleted: boolean;
                address: string;
                phoneNumber: string;
                totalPurchased: number;
                totalPaid: number;
                nextPaymentDate: Date | null;
            };
        };
    } & {
        id: number;
        createdAt: Date;
        isDeleted: boolean;
        class: string;
        quantity: number;
        deliveryDate: Date;
        carRent: number | null;
        deliveryNo: number;
        nextDeliveryDate: Date | null;
        deliveryReceived: number;
        deliveryRemaining: number;
        driverName: string | null;
        driverPhoneNumber: string | null;
        carNo: string | null;
        invoiceId: number;
    })[]>;
    getAllDeliveryListService: (startDate?: string, endDate?: string) => Promise<{
        id: number;
        customer: {
            name: string;
            address: string;
            totalPurchased: number;
            totalPaid: number;
        };
        note: string | null;
        cash: number | null;
        due: number | null;
        items: {
            id: number;
            rate: number;
            createdAt: Date;
            updatedAt: Date;
            isDeleted: boolean;
            class: string;
            quantity: number;
            delivered: number;
            price: number;
            challanId: number;
            deliveryDate: Date;
        }[];
    }[]>;
    getSingleDeliveryService: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        isDeleted: boolean;
        class: string;
        quantity: number;
        deliveryDate: Date;
        carRent: number | null;
        deliveryNo: number;
        nextDeliveryDate: Date | null;
        deliveryReceived: number;
        deliveryRemaining: number;
        driverName: string | null;
        driverPhoneNumber: string | null;
        carNo: string | null;
        invoiceId: number;
    } | null>;
};
//# sourceMappingURL=delivery.service.d.ts.map