/*
  Warnings:

  - Added the required column `seasonId` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `Round` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasonId` to the `cash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cash" ADD COLUMN     "seasonId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
