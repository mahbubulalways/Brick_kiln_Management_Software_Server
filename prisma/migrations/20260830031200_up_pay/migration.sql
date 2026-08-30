/*
  Warnings:

  - A unique constraint covering the columns `[vataId,serial,name,seasonId]` on the table `Ledger` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ledger_vataId_serial_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_vataId_serial_name_seasonId_key" ON "Ledger"("vataId", "serial", "name", "seasonId");
