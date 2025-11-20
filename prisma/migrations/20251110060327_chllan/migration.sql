-- CreateTable
CREATE TABLE "chllans" (
    "id" SERIAL NOT NULL,
    "serial" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "chalanType" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "challanDate" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "carRent" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "cash" DOUBLE PRECISION NOT NULL,
    "due" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chllans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challanItems" (
    "id" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "challanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challanItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "challanItems" ADD CONSTRAINT "challanItems_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
