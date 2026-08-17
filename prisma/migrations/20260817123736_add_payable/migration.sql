-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('GIVEN', 'TAKEN');

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

    CONSTRAINT "ReceivablePayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReceivablePayableTransaction" (
    "id" TEXT NOT NULL,
    "receivablePayableId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReceivablePayableTransaction_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "ReceivablePayableTransaction" ADD CONSTRAINT "ReceivablePayableTransaction_receivablePayableId_fkey" FOREIGN KEY ("receivablePayableId") REFERENCES "ReceivablePayable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
