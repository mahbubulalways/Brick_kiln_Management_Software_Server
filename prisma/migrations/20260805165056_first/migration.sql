-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL DEFAULT 'admin@gmail.com',
    "password" TEXT NOT NULL DEFAULT '12345678',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classAndRates" (
    "id" SERIAL NOT NULL,
    "classType" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "classAndRates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chllans" (
    "id" SERIAL NOT NULL,
    "serial" INTEGER NOT NULL,
    "chalanType" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "challanDate" TIMESTAMP(3) NOT NULL,
    "duePaymentDate" TIMESTAMP(3),
    "note" TEXT,
    "createdBy" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "carRent" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "cash" DOUBLE PRECISION,
    "due" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chllans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challanItems" (
    "id" SERIAL NOT NULL,
    "class" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivered" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "challanId" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "challanItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "totalPurchased" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nextPaymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" SERIAL NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "deliveryNo" INTEGER NOT NULL,
    "nextDeliveryDate" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL,
    "deliveryReceived" INTEGER NOT NULL,
    "class" TEXT NOT NULL,
    "deliveryRemaining" INTEGER NOT NULL,
    "driverName" TEXT,
    "driverPhoneNumber" TEXT,
    "carNo" TEXT,
    "carRent" DOUBLE PRECISION,
    "invoiceId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Due_Collection" (
    "id" SERIAL NOT NULL,
    "due" DOUBLE PRECISION NOT NULL,
    "collect" DOUBLE PRECISION NOT NULL,
    "newDue" DOUBLE PRECISION NOT NULL,
    "nextDate" TIMESTAMP(3),
    "customerId" INTEGER NOT NULL,
    "season" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Due_Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LedgerGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LedgerGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ledger" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "serial" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "totalBil" DOUBLE PRECISION NOT NULL,
    "cutting" DOUBLE PRECISION NOT NULL,
    "payment" DOUBLE PRECISION NOT NULL,
    "ledgerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_deliveryNo_key" ON "deliveries"("deliveryNo");

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_serial_key" ON "Ledger"("serial");

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challanItems" ADD CONSTRAINT "challanItems_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Due_Collection" ADD CONSTRAINT "Due_Collection_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "LedgerGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "Ledger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
