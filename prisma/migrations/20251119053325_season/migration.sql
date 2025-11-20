/*
  Warnings:

  - You are about to drop the column `challanId` on the `Due_Collection` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Due_Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Due_Collection" DROP CONSTRAINT "Due_Collection_challanId_fkey";

-- AlterTable
ALTER TABLE "Due_Collection" DROP COLUMN "challanId",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "season" TEXT;

-- AddForeignKey
ALTER TABLE "Due_Collection" ADD CONSTRAINT "Due_Collection_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
