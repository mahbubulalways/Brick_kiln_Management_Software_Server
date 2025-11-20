/*
  Warnings:

  - A unique constraint covering the columns `[deliveryNo]` on the table `deliveries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "deliveries_deliveryNo_key" ON "deliveries"("deliveryNo");
