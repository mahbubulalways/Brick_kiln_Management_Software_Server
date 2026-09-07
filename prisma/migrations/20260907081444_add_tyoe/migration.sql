/*
  Warnings:

  - Added the required column `type` to the `SmsRechargeHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SmsPaymentType" AS ENUM ('MANUAL', 'BKASH');

-- AlterTable
ALTER TABLE "SmsRechargeHistory" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "type" "SmsPaymentType" NOT NULL;
