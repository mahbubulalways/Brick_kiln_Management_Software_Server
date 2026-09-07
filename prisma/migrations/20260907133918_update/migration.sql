/*
  Warnings:

  - A unique constraint covering the columns `[vataId]` on the table `VataSmsSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VataSmsSettings_vataId_key" ON "VataSmsSettings"("vataId");
