/*
  Warnings:

  - You are about to drop the `GoodsIssueBack` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "GoodHistoryType" AS ENUM ('ISSUE', 'RETURN');

-- DropForeignKey
ALTER TABLE "GoodsIssueBack" DROP CONSTRAINT "GoodsIssueBack_goodId_fkey";

-- DropTable
DROP TABLE "GoodsIssueBack";

-- CreateTable
CREATE TABLE "GoodHistoryLog" (
    "id" TEXT NOT NULL,
    "type" "GoodHistoryType" NOT NULL,
    "receiveBy" TEXT NOT NULL,
    "returnBy" TEXT,
    "goodId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "damage" INTEGER,
    "lost" INTEGER,
    "okay" INTEGER,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodHistoryLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoodHistoryLog" ADD CONSTRAINT "GoodHistoryLog_goodId_fkey" FOREIGN KEY ("goodId") REFERENCES "GoodsStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
