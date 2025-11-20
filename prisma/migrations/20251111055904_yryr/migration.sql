/*
  Warnings:

  - You are about to drop the column `address` on the `chllans` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `chllans` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `chllans` table. All the data in the column will be lost.
  - Made the column `deliveryDate` on table `chllans` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "chllans" DROP COLUMN "address",
DROP COLUMN "customerName",
DROP COLUMN "phoneNumber",
ADD COLUMN     "duePaymentDate" TIMESTAMP(3),
ALTER COLUMN "deliveryDate" SET NOT NULL,
ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "carRent" DROP NOT NULL,
ALTER COLUMN "cash" DROP NOT NULL,
ALTER COLUMN "due" DROP NOT NULL;
