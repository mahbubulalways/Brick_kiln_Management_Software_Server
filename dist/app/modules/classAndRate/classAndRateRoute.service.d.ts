import { ClassAndRate } from "@prisma/client";
export declare const ClassAndRateService: {
    createClassAndRateService: (payload: ClassAndRate) => Promise<{
        id: number;
        classType: string;
        className: string;
        rate: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    }>;
    getClassAndRateService: () => Promise<{
        id: number;
        classType: string;
        className: string;
        rate: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    }[]>;
    getSingleClassAndRateService: (id: number) => Promise<{
        id: number;
        classType: string;
        className: string;
        rate: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    } | null>;
    updateClassAndRateService: (id: number, data: ClassAndRate) => Promise<{
        id: number;
        classType: string;
        className: string;
        rate: number;
        createdAt: Date;
        updatedAt: Date;
        isDeleted: boolean;
    }>;
};
//# sourceMappingURL=classAndRateRoute.service.d.ts.map