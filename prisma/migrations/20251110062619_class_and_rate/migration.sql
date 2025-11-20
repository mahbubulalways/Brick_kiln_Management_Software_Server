/*
  Warnings:

  - The primary key for the `challanItems` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `challanItems` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "challanItems" DROP CONSTRAINT "challanItems_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "challanItems_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "classAndRates" (
    "id" SERIAL NOT NULL,
    "classType" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "classAndRates_pkey" PRIMARY KEY ("id")
);
