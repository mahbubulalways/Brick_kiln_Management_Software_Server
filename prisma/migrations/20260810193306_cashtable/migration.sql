-- CreateEnum
CREATE TYPE "CashType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "cash" (
    "id" SERIAL NOT NULL,
    "type" "CashType" NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cash_type_idx" ON "cash"("type");

-- CreateIndex
CREATE INDEX "cash_createdAt_idx" ON "cash"("createdAt");
