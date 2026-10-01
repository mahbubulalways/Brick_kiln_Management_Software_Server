-- AlterTable
ALTER TABLE "StockBook" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';
