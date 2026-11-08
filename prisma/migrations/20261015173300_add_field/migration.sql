-- AlterTable
ALTER TABLE "users" ADD COLUMN     "expiryTime" TIMESTAMP(3),
ADD COLUMN     "recoveryCode" TEXT;
