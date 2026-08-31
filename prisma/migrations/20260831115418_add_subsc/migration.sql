/*
  Warnings:

  - You are about to drop the `SoftwareFee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'PAID', 'EXPIRED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "SoftwareFee" DROP CONSTRAINT "SoftwareFee_vataId_fkey";

-- DropForeignKey
ALTER TABLE "SystemAdmin" DROP CONSTRAINT "SystemAdmin_userId_fkey";

-- AlterTable
ALTER TABLE "vatainformation" ADD COLUMN     "subscriptionEnd" TIMESTAMP(3),
ADD COLUMN     "subscriptionStart" TIMESTAMP(3);

-- DropTable
DROP TABLE "SoftwareFee";

-- DropTable
DROP TABLE "SystemAdmin";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
