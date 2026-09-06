-- CreateTable
CREATE TABLE "VataCar" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VataCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarIncomeDelivery" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "driverId" TEXT NOT NULL,
    "deliveryId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarIncomeDelivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VataCar" ADD CONSTRAINT "VataCar_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarIncomeDelivery" ADD CONSTRAINT "CarIncomeDelivery_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "deliveries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarIncomeDelivery" ADD CONSTRAINT "CarIncomeDelivery_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarIncomeDelivery" ADD CONSTRAINT "CarIncomeDelivery_carId_fkey" FOREIGN KEY ("carId") REFERENCES "VataCar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
