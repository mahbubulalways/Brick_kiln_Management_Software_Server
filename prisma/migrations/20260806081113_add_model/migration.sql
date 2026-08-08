/*
  Warnings:

  - You are about to drop the column `description` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `totalBil` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalBill` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ledger" DROP CONSTRAINT "Ledger_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_ledgerId_fkey";

-- AlterTable
ALTER TABLE "Ledger" ALTER COLUMN "groupId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "description",
DROP COLUMN "totalBil",
DROP COLUMN "type",
ADD COLUMN     "document" TEXT,
ADD COLUMN     "paymentDetails" TEXT,
ADD COLUMN     "paymentDifference" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "paymentType" TEXT NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalBill" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "cutting" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LedgerGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "Ledger"("id") ON DELETE CASCADE ON UPDATE CASCADE;
