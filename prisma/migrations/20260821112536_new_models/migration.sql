-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'MANAGER', 'SYSTEM_ADMIN');

-- CreateEnum
CREATE TYPE "CashType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Admin',
    "username" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "password" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_histories" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classAndRates" (
    "id" TEXT NOT NULL,
    "classType" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "classAndRates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chllans" (
    "id" TEXT NOT NULL,
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
    "customerId" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "chllans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challanItems" (
    "id" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivered" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "challanId" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "challanItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "customerCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "totalPurchased" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nextPaymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deliveries" (
    "id" TEXT NOT NULL,
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
    "invoiceId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "due_collections" (
    "id" TEXT NOT NULL,
    "due" DOUBLE PRECISION NOT NULL,
    "collect" DOUBLE PRECISION NOT NULL,
    "newDue" DOUBLE PRECISION NOT NULL,
    "nextDate" TIMESTAMP(3),
    "customerId" TEXT NOT NULL,
    "season" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "due_collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ledger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serial" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,
    "rate" DOUBLE PRECISION DEFAULT 0,
    "quantity" DOUBLE PRECISION DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "Ledger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "cutting" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "payment" DOUBLE PRECISION NOT NULL,
    "ledgerId" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "document" TEXT,
    "paymentDetails" TEXT,
    "paymentDifference" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentType" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "totalBill" DOUBLE PRECISION NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash" (
    "id" TEXT NOT NULL,
    "type" "CashType" NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "cash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadInfo" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roundId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "loadType" TEXT NOT NULL,
    "classType" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoadInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unload" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roundId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnloadItem" (
    "id" TEXT NOT NULL,
    "unloadId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnloadItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vatainformation" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "nameEnglish" TEXT NOT NULL,
    "nameBangla" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "ownerPhoneNumber" TEXT NOT NULL,
    "challansPhoneNumber" TEXT NOT NULL,
    "smsRate" DECIMAL(10,2),
    "softwareFee" DECIMAL(10,2) NOT NULL,
    "nextPaymentDate" TIMESTAMP(3),
    "classAndRateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vatainformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "login_histories_userId_idx" ON "login_histories"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "classAndRates_vataId_classType_className_key" ON "classAndRates"("vataId", "classType", "className");

-- CreateIndex
CREATE UNIQUE INDEX "chllans_vataId_serial_key" ON "chllans"("vataId", "serial");

-- CreateIndex
CREATE UNIQUE INDEX "customers_vataId_customerCode_key" ON "customers"("vataId", "customerCode");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_invoiceId_deliveryNo_key" ON "deliveries"("invoiceId", "deliveryNo");

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_vataId_serial_key" ON "Ledger"("vataId", "serial");

-- CreateIndex
CREATE INDEX "cash_type_idx" ON "cash"("type");

-- CreateIndex
CREATE INDEX "cash_createdAt_idx" ON "cash"("createdAt");

-- CreateIndex
CREATE INDEX "cash_vataId_idx" ON "cash"("vataId");

-- CreateIndex
CREATE INDEX "Round_vataId_idx" ON "Round"("vataId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_vataId_name_key" ON "Round"("vataId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "UnloadItem_unloadId_classId_key" ON "UnloadItem"("unloadId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "vatainformation_vataId_key" ON "vatainformation"("vataId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_histories" ADD CONSTRAINT "login_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classAndRates" ADD CONSTRAINT "classAndRates_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challanItems" ADD CONSTRAINT "challanItems_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "due_collections" ADD CONSTRAINT "due_collections_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Ledger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "Ledger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadInfo" ADD CONSTRAINT "LoadInfo_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unload" ADD CONSTRAINT "Unload_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_unloadId_fkey" FOREIGN KEY ("unloadId") REFERENCES "Unload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classAndRates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
