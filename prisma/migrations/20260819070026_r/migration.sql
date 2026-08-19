/*
  Warnings:

  - You are about to drop the column `serial` on the `Ledger` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Ledger_serial_key";

-- AlterTable
ALTER TABLE "Ledger" DROP COLUMN "serial";
