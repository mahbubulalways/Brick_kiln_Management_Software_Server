-- CreateEnum
CREATE TYPE "GoodLossType" AS ENUM ('DAMAGED', 'LOST');

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
    "image" TEXT NOT NULL,
    "goodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsLoss" (
    "id" TEXT NOT NULL,
    "goodId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "lossAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsLoss_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoodsStockCategory" ADD CONSTRAINT "GoodsStockCategory_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsStock" ADD CONSTRAINT "GoodsStock_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GoodsStockCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsStock" ADD CONSTRAINT "GoodsStock_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsIssue" ADD CONSTRAINT "GoodsIssue_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsLoss" ADD CONSTRAINT "GoodsLoss_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
