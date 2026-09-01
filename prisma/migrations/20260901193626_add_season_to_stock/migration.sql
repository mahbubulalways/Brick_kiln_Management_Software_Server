/*
  Warnings:

  - Added the required column `seasonId` to the `StockBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockBook" ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StockBook" ADD CONSTRAINT "StockBook_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
