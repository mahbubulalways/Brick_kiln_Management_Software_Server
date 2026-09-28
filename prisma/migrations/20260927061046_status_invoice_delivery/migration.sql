-- AlterTable
ALTER TABLE "chllans" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';
