/*
  Warnings:

  - You are about to drop the column `seasonId` on the `customers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_seasonId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "seasonId";
