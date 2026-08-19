/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serial` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "serial" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_serial_key" ON "Ledger"("serial");
