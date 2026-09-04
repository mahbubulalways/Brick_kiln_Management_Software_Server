/*
  Warnings:

  - You are about to drop the column `smsRate` on the `vatainformation` table. All the data in the column will be lost.
  - You are about to drop the column `softwareFee` on the `vatainformation` table. All the data in the column will be lost.
  - You are about to drop the column `susbscriptionPlanId` on the `vatainformation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vatainformation" DROP CONSTRAINT "vatainformation_susbscriptionPlanId_fkey";

-- AlterTable
ALTER TABLE "vatainformation" DROP COLUMN "smsRate",
DROP COLUMN "softwareFee",
DROP COLUMN "susbscriptionPlanId",
ADD COLUMN     "subscriptionPlanId" TEXT;

-- AddForeignKey
ALTER TABLE "vatainformation" ADD CONSTRAINT "vatainformation_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
