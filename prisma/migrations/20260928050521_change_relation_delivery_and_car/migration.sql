/*
  Warnings:

  - A unique constraint covering the columns `[deliveryId]` on the table `CarIncomeDelivery` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CarIncomeDelivery_deliveryId_key" ON "CarIncomeDelivery"("deliveryId");
