-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ApprovalRequest" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
