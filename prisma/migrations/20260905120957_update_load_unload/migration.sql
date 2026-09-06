-- CreateEnum
CREATE TYPE "LoadType" AS ENUM ('RAWENTRY', 'FIELD_TO_CHULLI', 'STOCK_TO_CHULLI', 'CHULLI_TO_FINISHED', 'FIELD_TO_STOCK');

-- CreateEnum
CREATE TYPE "UnloadType" AS ENUM ('RAW_TO_FIELD', 'FIELD_TO_CHULLI', 'CHULLI_TO_FINISHED', 'STOCK_TO_CHULLI', 'FIELD_TO_STOCK');

-- CreateEnum
CREATE TYPE "GoodHistoryType" AS ENUM ('ISSUE', 'RETURN');

-- CreateEnum
CREATE TYPE "GoodLossType" AS ENUM ('DAMAGED', 'LOST');

-- CreateEnum
CREATE TYPE "SubscriptionPlanType" AS ENUM ('FREE', 'BASIC', 'PROFESSIONAL', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "SubscriptionPaymentStatus" AS ENUM ('PENDING', 'PAID', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'MANAGER', 'SYSTEM_ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "VataStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "CashType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('FILE', 'FOLDER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('COMPLETE', 'PENDING');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('GIVEN', 'TAKEN', 'PAYMENT');

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
    "deliverySeason" TEXT,
    "note" TEXT,
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
    "createdById" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,

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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "nextPaymentDate" TIMESTAMP(3),
    "note" TEXT,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customerdues" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "challanId" TEXT NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "paidAmount" DECIMAL(12,2) NOT NULL,
    "dueAmount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customerdues_pkey" PRIMARY KEY ("id")
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
    "carNo" TEXT,
    "lastDelivered" INTEGER,
    "carRent" DOUBLE PRECISION,
    "invoiceId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "season" TEXT,
    "deliveryById" TEXT NOT NULL,
    "driverId" TEXT,

    CONSTRAINT "deliveries_pkey" PRIMARY KEY ("id")
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
    "seasonId" TEXT NOT NULL,

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
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "cash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadInfo" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roundId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "loadType" "LoadType" NOT NULL,
    "classId" TEXT,
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
    "type" "UnloadType" NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Unload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnloadItem" (
    "id" TEXT NOT NULL,
    "unloadId" TEXT NOT NULL,
    "classId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "damaged" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnloadItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockBook" (
    "id" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "stockIn" INTEGER NOT NULL DEFAULT 0,
    "stockOut" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "StockBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsStockCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "GoodsStockCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsStock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "warranty" TIMESTAMP(3),
    "image" TEXT,
    "categoryId" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsIssue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "goodId" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodHistoryLog" (
    "id" TEXT NOT NULL,
    "type" "GoodHistoryType" NOT NULL,
    "receiveBy" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "returnBy" TEXT,
    "goodId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "damage" INTEGER,
    "lost" INTEGER,
    "okay" INTEGER,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodHistoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsLoss" (
    "id" TEXT NOT NULL,
    "goodId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "type" "GoodLossType" NOT NULL,
    "lossAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsLoss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "parentId" TEXT,
    "fileUrl" TEXT,
    "fileKey" TEXT,
    "mimeType" TEXT,
    "size" BIGINT,
    "extension" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carrents" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "carrents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "productImage" TEXT,
    "warranty" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskManager" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "repeat" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "vataId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceivablePayable" (
    "id" TEXT NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currentAmount" DECIMAL(12,2) NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "witnessOne" TEXT,
    "witnessTwo" TEXT,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "ReceivablePayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceivablePayableTransaction" (
    "id" TEXT NOT NULL,
    "receivablePayableId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "remaining" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "ReceivablePayableTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weather" (
    "id" TEXT NOT NULL,
    "linkOne" TEXT,
    "linkTwo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vataId" TEXT NOT NULL,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
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
    "nextPaymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subdomain" TEXT NOT NULL,
    "status" "VataStatus" NOT NULL DEFAULT 'ACTIVE',
    "subscriptionPlanId" TEXT,
    "subscriptionStart" TIMESTAMP(3),
    "subscriptionEnd" TIMESTAMP(3),

    CONSTRAINT "vatainformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SubscriptionPlanType" NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "billingCycle" "BillingCycle" NOT NULL,
    "features" TEXT[],
    "maxUsers" INTEGER,
    "maxStorage" INTEGER,
    "maxTasks" INTEGER,
    "maxInvoices" INTEGER,
    "maxSms" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPayment" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "subscriptionPlanId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "SubscriptionPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "salary" DECIMAL(12,2) NOT NULL,
    "vataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "customerdues_customerId_seasonId_idx" ON "customerdues"("customerId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "customerdues_challanId_key" ON "customerdues"("challanId");

-- CreateIndex
CREATE UNIQUE INDEX "deliveries_invoiceId_deliveryNo_key" ON "deliveries"("invoiceId", "deliveryNo");

-- CreateIndex
CREATE INDEX "duecollections_customerId_seasonId_idx" ON "duecollections"("customerId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "Ledger_vataId_serial_name_seasonId_key" ON "Ledger"("vataId", "serial", "name", "seasonId");

-- CreateIndex
CREATE INDEX "cash_type_idx" ON "cash"("type");

-- CreateIndex
CREATE INDEX "cash_createdAt_idx" ON "cash"("createdAt");

-- CreateIndex
CREATE INDEX "cash_vataId_idx" ON "cash"("vataId");

-- CreateIndex
CREATE INDEX "Round_vataId_idx" ON "Round"("vataId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_vataId_name_seasonId_key" ON "Round"("vataId", "name", "seasonId");

-- CreateIndex
CREATE INDEX "Unload_roundId_idx" ON "Unload"("roundId");

-- CreateIndex
CREATE INDEX "Unload_type_idx" ON "Unload"("type");

-- CreateIndex
CREATE INDEX "UnloadItem_unloadId_idx" ON "UnloadItem"("unloadId");

-- CreateIndex
CREATE INDEX "UnloadItem_classId_idx" ON "UnloadItem"("classId");

-- CreateIndex
CREATE INDEX "Document_type_idx" ON "Document"("type");

-- CreateIndex
CREATE INDEX "Document_parentId_idx" ON "Document"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_parentId_name_key" ON "Document"("parentId", "name");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_shop_idx" ON "products"("shop");

-- CreateIndex
CREATE INDEX "ReceivablePayable_transactionType_idx" ON "ReceivablePayable"("transactionType");

-- CreateIndex
CREATE INDEX "ReceivablePayable_phone_idx" ON "ReceivablePayable"("phone");

-- CreateIndex
CREATE INDEX "ReceivablePayable_isDeleted_idx" ON "ReceivablePayable"("isDeleted");

-- CreateIndex
CREATE INDEX "ReceivablePayableTransaction_receivablePayableId_idx" ON "ReceivablePayableTransaction"("receivablePayableId");

-- CreateIndex
CREATE INDEX "ReceivablePayableTransaction_transactionDate_idx" ON "ReceivablePayableTransaction"("transactionDate");

-- CreateIndex
CREATE UNIQUE INDEX "vatainformation_vataId_key" ON "vatainformation"("vataId");

-- CreateIndex
CREATE UNIQUE INDEX "vatainformation_subdomain_key" ON "vatainformation"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_name_key" ON "SubscriptionPlan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_type_key" ON "SubscriptionPlan"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_histories" ADD CONSTRAINT "login_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classAndRates" ADD CONSTRAINT "classAndRates_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chllans" ADD CONSTRAINT "chllans_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challanItems" ADD CONSTRAINT "challanItems_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerdues" ADD CONSTRAINT "customerdues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerdues" ADD CONSTRAINT "customerdues_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerdues" ADD CONSTRAINT "customerdues_challanId_fkey" FOREIGN KEY ("challanId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_deliveryById_fkey" FOREIGN KEY ("deliveryById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deliveries" ADD CONSTRAINT "deliveries_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "chllans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duecollections" ADD CONSTRAINT "duecollections_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "duecollections" ADD CONSTRAINT "duecollections_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Ledger"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ledger" ADD CONSTRAINT "Ledger_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "Ledger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash" ADD CONSTRAINT "cash_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadInfo" ADD CONSTRAINT "LoadInfo_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classAndRates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadInfo" ADD CONSTRAINT "LoadInfo_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unload" ADD CONSTRAINT "Unload_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_unloadId_fkey" FOREIGN KEY ("unloadId") REFERENCES "Unload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnloadItem" ADD CONSTRAINT "UnloadItem_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classAndRates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBook" ADD CONSTRAINT "StockBook_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBook" ADD CONSTRAINT "StockBook_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockBook" ADD CONSTRAINT "StockBook_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsStockCategory" ADD CONSTRAINT "GoodsStockCategory_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsStock" ADD CONSTRAINT "GoodsStock_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GoodsStockCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsStock" ADD CONSTRAINT "GoodsStock_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssue" ADD CONSTRAINT "GoodsIssue_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodHistoryLog" ADD CONSTRAINT "GoodHistoryLog_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsLoss" ADD CONSTRAINT "GoodsLoss_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrents" ADD CONSTRAINT "carrents_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskManager" ADD CONSTRAINT "TaskManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskManager" ADD CONSTRAINT "TaskManager_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivablePayable" ADD CONSTRAINT "ReceivablePayable_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivablePayableTransaction" ADD CONSTRAINT "ReceivablePayableTransaction_receivablePayableId_fkey" FOREIGN KEY ("receivablePayableId") REFERENCES "ReceivablePayable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReceivablePayableTransaction" ADD CONSTRAINT "ReceivablePayableTransaction_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weather" ADD CONSTRAINT "Weather_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vatainformation" ADD CONSTRAINT "vatainformation_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
