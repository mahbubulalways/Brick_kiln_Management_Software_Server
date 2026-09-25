-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'OPERATOR';

-- AlterTable
ALTER TABLE "classAndRates" ADD COLUMN     "advanceRate" DOUBLE PRECISION NOT NULL DEFAULT 0;
