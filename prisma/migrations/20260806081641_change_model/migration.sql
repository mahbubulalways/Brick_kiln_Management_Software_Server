/*
  Warnings:

  - You are about to drop the column `groupId` on the `Ledger` table. All the data in the column will be lost.
  - You are about to drop the `LedgerGroup` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `Ledger` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ledger" DROP CONSTRAINT "Ledger_groupId_fkey";

-- AlterTable
ALTER TABLE "Ledger" DROP COLUMN "groupId",
ADD COLUMN     "parentId" INTEGER,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "LedgerGroup";

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Ledger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
