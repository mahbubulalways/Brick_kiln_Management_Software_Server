import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
declare const VALIDATE_REQUEST: (payload: ZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default VALIDATE_REQUEST;
//# sourceMappingURL=validateRequest.d.ts.map