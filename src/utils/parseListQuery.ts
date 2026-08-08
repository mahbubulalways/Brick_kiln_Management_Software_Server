import { z } from "zod";
import { Request } from "express";

const querySchema = z
  .object({
    page: z.coerce
      .number({ error: "পেজ অবশ্যই একটি সংখ্যা হতে হবে" })
      .int({ message: "পেজ অবশ্যই পূর্ণসংখ্যা হতে হবে" })
      .positive({ message: "পেজ অবশ্যই ০-এর চেয়ে বড় হতে হবে" })
      .default(1),

    limit: z.coerce
      .number({ error: "লিমিট অবশ্যই একটি সংখ্যা হতে হবে" })
      .int({ message: "লিমিট অবশ্যই পূর্ণসংখ্যা হতে হবে" })
      .positive({ message: "লিমিট অবশ্যই ০-এর চেয়ে বড় হতে হবে" })
      .default(10),

    search: z.string({ error: "সার্চ অবশ্যই একটি টেক্সট হতে হবে" }).default(""),
    date: z.string({ error: "সার্চ অবশ্যই একটি টেক্সট হতে হবে" }).default(""),
  })
  .strict();

export async function parseListQuery(query: Request["query"]) {
  const allowedKeys = ["page", "limit", "search", "date"];

  const invalidKeys = Object.keys(query).filter(
    (key) => !allowedKeys.includes(key),
  );

  if (invalidKeys.length > 0) {
    throw new Error(`'${invalidKeys[0]}' এই কুয়েরি প্যারামিটারটি বৈধ নয়`);
  }

  return querySchema.parseAsync(query);
}
