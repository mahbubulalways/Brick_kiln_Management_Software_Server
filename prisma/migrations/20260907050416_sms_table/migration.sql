-- CreateEnum
CREATE TYPE "SmsRechargeStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "SmsSetting" (
    "id" TEXT NOT NULL,
    "ratePerSms" DECIMAL(10,4) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmsSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsWallet" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPurchased" INTEGER NOT NULL DEFAULT 0,
    "totalUsed" INTEGER NOT NULL DEFAULT 0,
    "currentRate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmsWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmsRechargeHistory" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "smsQuantity" INTEGER NOT NULL,
    "ratePerSms" DECIMAL(10,4) NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "status" "SmsRechargeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmsRechargeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SmsWallet_vataId_key" ON "SmsWallet"("vataId");

-- AddForeignKey
ALTER TABLE "SmsWallet" ADD CONSTRAINT "SmsWallet_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("vataId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmsRechargeHistory" ADD CONSTRAINT "SmsRechargeHistory_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("vataId") ON DELETE RESTRICT ON UPDATE CASCADE;
