import { ZodError } from "zod";
import { IErrorSources, IGenericErrorResponse } from "../../interface/error";

export const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSources = err.issues.map((issue) => {
    const lastPath = issue.path[issue.path.length - 1];
    return {
      path: typeof lastPath === "symbol" ? lastPath.toString() : lastPath,
      message: issue.message,
    };
  }) as IErrorSources;
  const statusCode = 400;
  return {
    statusCode,
    message: "Zod validation error",
    errorSources,
  };
};
