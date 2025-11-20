-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "challanItems" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "chllans" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "classAndRates" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
