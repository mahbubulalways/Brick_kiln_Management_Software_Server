-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "GoodsStockCategory" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "LoadInfo" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "TaskManager" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- AlterTable
ALTER TABLE "carrents" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';
