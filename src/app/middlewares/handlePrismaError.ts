// import { Prisma } from "@prisma/client";
// import { IGenericErrorResponse, IErrorSources } from "../../interface/error";

// export const handlePrismaError = (
//   err: Prisma.PrismaClientKnownRequestError
// ): IGenericErrorResponse => {
//   const errorSources: IErrorSources = [];

//   let message = "Database error";
//   const statusCode = 400;

//   // Handle unique constraint violation
//   if (err.code === "P2002") {
//     const fields = Array.isArray(err.meta?.target)
//       ? err.meta?.target
//       : [err.meta?.target];
//     fields.forEach((field) => {
//       errorSources.push({
//         path: field as string,
//         message: `The value for "${field}" already exists.`,
//       });
//     });
//     message = "Unique constraint violation";
//   }
//   // Optional: handle other Prisma errors
//   else {
//     errorSources.push({
//       path: "",
//       message: err.message,
//     });
//   }

//   return {
//     statusCode,
//     message,
//     errorSources,
//   };
// };
