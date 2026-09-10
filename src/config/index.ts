import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export const Config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  MRAM_API_KEY: process.env.MRAM_API_KEY,
  MRAM_SENDER_ID: process.env.MRAM_SENDER_ID,
  MRAM_BASE_URL: process.env.MRAM_BASE_URL,
};
