-- CreateTable
CREATE TABLE "deliveries" (
    "id" SERIAL NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "deliveryNo" INTEGER NOT NULL,
    "nextDeliveryDate" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "deliveryReceived" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "deliveryRemaining" INTEGER NOT NULL,
    "driverName" TEXT,
    "driverPhoneNumber" TEXT,
    "carNo" TEXT,
    "invoiceId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
