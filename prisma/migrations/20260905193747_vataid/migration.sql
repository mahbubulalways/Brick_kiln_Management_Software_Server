/*
  Warnings:

  - A unique constraint covering the columns `[vataId]` on the table `BrickStockSummary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BrickStockSummary_vataId_key" ON "BrickStockSummary"("vataId");
