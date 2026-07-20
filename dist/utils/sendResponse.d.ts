import { Response } from "express";
export type TApiResponse<T> = {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
};
export declare const sendResponse: <T>(res: Response, payload: TApiResponse<T>) => Response<any, Record<string, any>>;
//# sourceMappingURL=sendResponse.d.ts.map