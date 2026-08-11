/*
  Warnings:

  - You are about to drop the column `classId` on the `Unload` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Unload` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unload" DROP CONSTRAINT "Unload_classId_fkey";

-- DropIndex
DROP INDEX "Unload_classId_idx";

-- DropIndex
DROP INDEX "Unload_date_idx";

-- DropIndex
DROP INDEX "Unload_date_roundId_classId_key";

-- DropIndex
DROP INDEX "Unload_roundId_idx";

-- AlterTable
ALTER TABLE "Unload" DROP COLUMN "classId",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "UnloadItem" (
    "id" SERIAL NOT NULL,
    "unloadId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UnloadItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_unloadId_fkey" FOREIGN KEY ("unloadId") REFERENCES "Unload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classAndRates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
