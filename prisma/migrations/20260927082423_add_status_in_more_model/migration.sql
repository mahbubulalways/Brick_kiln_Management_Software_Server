-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "cash" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "duecollections" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';
