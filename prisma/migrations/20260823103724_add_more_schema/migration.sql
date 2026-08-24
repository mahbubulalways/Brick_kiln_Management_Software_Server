-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('FILE', 'FOLDER');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('COMPLETE', 'PENDING');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('GIVEN', 'TAKEN', 'PAYMENT');

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
    "id" SERIAL NOT NULL,
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
