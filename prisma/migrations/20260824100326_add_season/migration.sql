/*
  Warnings:

  - You are about to drop the column `season` on the `Ledger` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `LoadInfo` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `Unload` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `UnloadItem` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `cash` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `chllans` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `due_collections` table. All the data in the column will be lost.
  - Added the required column `seasonId` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `LoadInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `Unload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `UnloadItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `cash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `chllans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `due_collections` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SoftwareFeeStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- AlterTable
ALTER TABLE "Ledger" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LoadInfo" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unload" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UnloadItem" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cash" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "chllans" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "due_collections" DROP COLUMN "season",
ADD COLUMN     "seasonId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SoftwareFee" (
    "id" TEXT NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "status" "SoftwareFeeStatus" NOT NULL DEFAULT 'PENDING',
    "vataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoftwareFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "due_collections" ADD CONSTRAINT "due_collections_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadInfo" ADD CONSTRAINT "LoadInfo_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unload" ADD CONSTRAINT "Unload_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareFee" ADD CONSTRAINT "SoftwareFee_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("vataId") ON DELETE RESTRICT ON UPDATE CASCADE;
