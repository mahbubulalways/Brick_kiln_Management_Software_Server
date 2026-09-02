/*
  Warnings:

  - Added the required column `type` to the `GoodsLoss` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoodsIssue" ADD COLUMN     "note" TEXT,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GoodsLoss" ADD COLUMN     "type" "GoodLossType" NOT NULL;
