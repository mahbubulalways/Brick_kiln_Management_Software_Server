/*
  Warnings:

  - You are about to drop the column `driverName` on the `deliveries` table. All the data in the column will be lost.
  - You are about to drop the column `driverPhoneNumber` on the `deliveries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deliveries" DROP COLUMN "driverName",
DROP COLUMN "driverPhoneNumber",
ADD COLUMN     "lastDelivered" INTEGER;
