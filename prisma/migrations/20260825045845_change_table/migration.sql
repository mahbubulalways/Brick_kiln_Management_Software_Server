/*
  Warnings:

  - You are about to drop the column `nextPaymentDate` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `totalPaid` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `totalPurchased` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the `due_collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "due_collections" DROP CONSTRAINT "due_collections_customerId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "nextPaymentDate",
DROP COLUMN "totalPaid",
DROP COLUMN "totalPurchased",
ALTER COLUMN "seasonId" DROP NOT NULL;

-- DropTable
DROP TABLE "due_collections";

-- CreateTable
CREATE TABLE "customerdues" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "challanId" TEXT NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "paidAmount" DECIMAL(12,2) NOT NULL,
    "dueAmount" DECIMAL(12,2) NOT NULL,
    "nextPaymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerdues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "duecollections" (
    "id" TEXT NOT NULL,
    "due" DOUBLE PRECISION NOT NULL,
    "collect" DOUBLE PRECISION NOT NULL,
    "newDue" DOUBLE PRECISION NOT NULL,
    "nextDate" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "duecollections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "customerdues_customerId_seasonId_idx" ON "customerdues"("customerId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "customerdues_challanId_key" ON "customerdues"("challanId");

-- CreateIndex
CREATE INDEX "duecollections_customerId_seasonId_idx" ON "duecollections"("customerId", "seasonId");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerdues" ADD CONSTRAINT "customerdues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerdues" ADD CONSTRAINT "customerdues_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerdues" ADD CONSTRAINT "customerdues_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duecollections" ADD CONSTRAINT "duecollections_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duecollections" ADD CONSTRAINT "duecollections_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
