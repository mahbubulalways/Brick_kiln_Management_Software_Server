/*
  Warnings:

  - You are about to alter the column `smsRate` on the `vatainformation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `softwareFee` on the `vatainformation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "vatainformation" ALTER COLUMN "smsRate" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "softwareFee" SET DATA TYPE DOUBLE PRECISION;
