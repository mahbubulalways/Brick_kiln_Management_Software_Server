-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'PROCESSING', 'CANCEL', 'DELIVERED');

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "status" "DeliveryStatus" NOT NULL DEFAULT 'PROCESSING';

-- CreateTable
CREATE TABLE "DeliveryStatusActionTime" (
    "id" TEXT NOT NULL,
    "deliveryId" TEXT NOT NULL,
    "pendingTime" TIMESTAMP(3),
    "processingTime" TIMESTAMP(3),
    "deliveredTime" TIMESTAMP(3),
    "cancelTime" TIMESTAMP(3),

    CONSTRAINT "DeliveryStatusActionTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryStatusActionTime_deliveryId_key" ON "DeliveryStatusActionTime"("deliveryId");

-- AddForeignKey
ALTER TABLE "DeliveryStatusActionTime" ADD CONSTRAINT "DeliveryStatusActionTime_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
