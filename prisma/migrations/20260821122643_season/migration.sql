-- AlterTable
ALTER TABLE "Ledger" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "LoadInfo" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "Unload" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "UnloadItem" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "cash" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "challanItems" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "chllans" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "season" TEXT;

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "season" TEXT;
