-- CreateEnum
CREATE TYPE "DatabaseBackupType" AS ENUM ('MANUAL', 'AUTO');

-- CreateTable
CREATE TABLE "DatabaseBackupPermission" (
    "id" TEXT NOT NULL,
    "type" "DatabaseBackupType" NOT NULL,

    CONSTRAINT "DatabaseBackupPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DatabaseBackup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "backupType" "DatabaseBackupType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DatabaseBackup_pkey" PRIMARY KEY ("id")
);
