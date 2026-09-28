-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';
