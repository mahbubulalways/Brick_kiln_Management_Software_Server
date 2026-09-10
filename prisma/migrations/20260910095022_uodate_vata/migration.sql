/*
  Warnings:

  - You are about to drop the column `challansPhoneNumber` on the `vatainformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vatainformation" DROP COLUMN "challansPhoneNumber",
ADD COLUMN     "challanManagerPhoneNumber" TEXT,
ADD COLUMN     "challanPersonOneName" TEXT,
ADD COLUMN     "challanPersonOnePhoneNumber" TEXT,
ADD COLUMN     "challanPersonTwoName" TEXT,
ADD COLUMN     "challanPersonTwoPhoneNumber" TEXT,
ADD COLUMN     "shortForm" TEXT;
