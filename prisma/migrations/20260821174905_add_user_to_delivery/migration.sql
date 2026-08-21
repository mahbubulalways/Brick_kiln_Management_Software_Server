/*
  Warnings:

  - Added the required column `deliveryById` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "deliveryById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryById_fkey" FOREIGN KEY ("deliveryById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
