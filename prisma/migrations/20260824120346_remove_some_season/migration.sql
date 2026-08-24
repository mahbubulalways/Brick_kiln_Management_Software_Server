/*
  Warnings:

  - You are about to drop the column `seasonId` on the `Ledger` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `LoadInfo` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Unload` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `UnloadItem` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `due_collections` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ledger" DROP CONSTRAINT "Ledger_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "LoadInfo" DROP CONSTRAINT "LoadInfo_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Unload" DROP CONSTRAINT "Unload_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "UnloadItem" DROP CONSTRAINT "UnloadItem_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "cash" DROP CONSTRAINT "cash_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "due_collections" DROP CONSTRAINT "due_collections_seasonId_fkey";

-- AlterTable
ALTER TABLE "Ledger" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "LoadInfo" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "Unload" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "UnloadItem" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "cash" DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "due_collections" DROP COLUMN "seasonId";
