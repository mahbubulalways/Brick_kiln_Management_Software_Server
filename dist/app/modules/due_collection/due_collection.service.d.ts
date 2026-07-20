import { Due_Collection } from "@prisma/client";
export declare const DueCollectionService: {
    getDueOfCustomerService: (customerId: number) => Promise<{
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
    } | null>;
    collectDueService: (payload: Due_Collection) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        due: number;
        customerId: number;
        collect: number;
        newDue: number;
        nextDate: Date;
        season: string | null;
    }>;
    todayPayDueService: (date: string) => Promise<({
        challans: {
            note: string | null;
            items: {
                quantity: number;
                delivered: number;
            }[];
        }[];
    } & {
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
    })[]>;
    getTodaysDuePaidService: (date: string) => Promise<({
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        due: number;
        customerId: number;
        collect: number;
        newDue: number;
        nextDate: Date;
        season: string | null;
    })[]>;
    getAllDueListService: (startDate?: string, endDate?: string) => Promise<({
        challans: {
            items: {
                quantity: number;
                delivered: number;
            }[];
        }[];
    } & {
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
    })[]>;
    getSingleDueCollectionService: (id: number) => Promise<({
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        due: number;
        customerId: number;
        collect: number;
        newDue: number;
        nextDate: Date;
        season: string | null;
    }) | null>;
    updateDueCollectionService: (id: number, payload: Due_Collection) => Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
        due: number;
        customerId: number;
        collect: number;
        newDue: number;
        nextDate: Date;
        season: string | null;
    }>;
};
//# sourceMappingURL=due_collection.service.d.ts.map