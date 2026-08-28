/*
  Warnings:

  - Added the required column `PhoneNumber` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "PhoneNumber" TEXT NOT NULL,
ADD COLUMN     "salary" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "driverId" TEXT;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
