-- CreateEnum
CREATE TYPE "VataStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "vatainformation" ADD COLUMN     "status" "VataStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "SoftwareFeeStatus";
