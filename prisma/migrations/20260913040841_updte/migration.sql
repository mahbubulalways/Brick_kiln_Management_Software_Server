/*
  Warnings:

  - You are about to drop the column `backupType` on the `DatabaseBackup` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DatabaseBackup` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DatabaseBackup` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `DatabaseBackup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `DatabaseBackup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `DatabaseBackup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `DatabaseBackup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DatabaseBackup" DROP COLUMN "backupType",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "fileSize" BIGINT NOT NULL,
ADD COLUMN     "tableCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tableRowCounts" JSONB,
ADD COLUMN     "totalRowCount" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "type" "DatabaseBackupType" NOT NULL;
