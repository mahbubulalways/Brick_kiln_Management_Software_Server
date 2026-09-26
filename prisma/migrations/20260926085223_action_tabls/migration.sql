-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "ApprovalAction" AS ENUM ('UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('DEFAULT', 'PENDING', 'APPROVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('CHALLAN', 'DELIVERY', 'CUSTOMER', 'PAYMENT', 'STOCK', 'LEDGER', 'DUE', 'CASH', 'INVOICE');

-- AlterTable
ALTER TABLE "classAndRates" ADD COLUMN     "deleteStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "updateStatus" "ApprovalStatus" NOT NULL DEFAULT 'DEFAULT';

-- CreateTable
CREATE TABLE "ApprovalRequest" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "action" "ApprovalAction" NOT NULL,
    "module" "ModuleType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "reviewNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApprovalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "userId" TEXT,
    "module" "ModuleType" NOT NULL,
    "action" "ActivityAction" NOT NULL,
    "targetId" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApprovalRequest_vataId_status_idx" ON "ApprovalRequest"("vataId", "status");

-- CreateIndex
CREATE INDEX "ApprovalRequest_targetId_idx" ON "ApprovalRequest"("targetId");

-- CreateIndex
CREATE INDEX "ApprovalRequest_module_targetId_idx" ON "ApprovalRequest"("module", "targetId");

-- CreateIndex
CREATE INDEX "ActivityLog_vataId_createdAt_idx" ON "ActivityLog"("vataId", "createdAt");

-- CreateIndex
CREATE INDEX "ActivityLog_vataId_userId_idx" ON "ActivityLog"("vataId", "userId");

-- CreateIndex
CREATE INDEX "ActivityLog_vataId_module_idx" ON "ActivityLog"("vataId", "module");

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
