/*
  Warnings:

  - You are about to drop the column `classType` on the `LoadInfo` table. All the data in the column will be lost.
  - You are about to drop the column `loadType` on the `LoadInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LoadInfo" DROP COLUMN "classType",
DROP COLUMN "loadType",
ADD COLUMN     "classId" TEXT;

-- CreateTable
CREATE TABLE "StockBook" (
    "id" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "stockIn" INTEGER NOT NULL DEFAULT 0,
    "stockOut" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "StockBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoadInfo" ADD CONSTRAINT "LoadInfo_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classAndRates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBook" ADD CONSTRAINT "StockBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBook" ADD CONSTRAINT "StockBook_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
