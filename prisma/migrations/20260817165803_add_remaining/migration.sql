/*
  Warnings:

  - You are about to alter the column `amount` on the `ReceivablePayableTransaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `DoublePrecision`.
  - Added the required column `remaining` to the `ReceivablePayableTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReceivablePayableTransaction" ADD COLUMN     "remaining" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
