"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseListQuery = parseListQuery;
const zod_1 = require("zod");
const querySchema = zod_1.z
    .object({
    page: zod_1.z.coerce
        .number({ error: "পেজ অবশ্যই একটি সংখ্যা হতে হবে" })
        .int({ message: "পেজ অবশ্যই পূর্ণসংখ্যা হতে হবে" })
        .positive({ message: "পেজ অবশ্যই ০-এর চেয়ে বড় হতে হবে" })
        .default(1),
    limit: zod_1.z.coerce
        .number({ error: "লিমিট অবশ্যই একটি সংখ্যা হতে হবে" })
        .int({ message: "লিমিট অবশ্যই পূর্ণসংখ্যা হতে হবে" })
        .positive({ message: "লিমিট অবশ্যই ০-এর চেয়ে বড় হতে হবে" })
        .default(10),
    search: zod_1.z.string({ error: "সার্চ অবশ্যই একটি টেক্সট হতে হবে" }).default(""),
    date: zod_1.z.string({ error: "সার্চ অবশ্যই একটি টেক্সট হতে হবে" }).default(""),
})
    .strict();
async function parseListQuery(query) {
    const allowedKeys = ["page", "limit", "search", "date"];
    const invalidKeys = Object.keys(query).filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        throw new Error(`'${invalidKeys[0]}' এই কুয়েরি প্যারামিটারটি বৈধ নয়`);
    }
    return querySchema.parseAsync(query);
}
