import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
};
