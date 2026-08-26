/*
  Warnings:

  - You are about to drop the column `nextPaymentDate` on the `customerdues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customerdues" DROP COLUMN "nextPaymentDate";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "nextPaymentDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
