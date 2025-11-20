import { z } from "zod";

export const CLASS_AND_RATE_VALIDATION = z.object({
  classType: z
    .string({ error: "Class type is required" })
    .min(1, "Class type cannot be empty"),

  className: z
    .string({ error: "Class name is required" })
    .min(1, "Class name cannot be empty"),

  rate: z.number({ error: "Rate is required" }),
});
