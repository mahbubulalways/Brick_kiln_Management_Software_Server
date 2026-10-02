-- CreateTable
CREATE TABLE "vata_backups" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "backupData" JSONB NOT NULL,
    "jsonFileName" TEXT,
    "jsonFilePath" TEXT,
    "jsonFileSize" BIGINT,
    "sqlFileName" TEXT,
    "sqlFilePath" TEXT,
    "sqlFileSize" BIGINT,
    "tableCount" INTEGER NOT NULL DEFAULT 0,
    "totalRowCount" BIGINT NOT NULL DEFAULT 0,
    "tableRowCounts" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vata_backups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vata_backups_vataId_key" ON "vata_backups"("vataId");

-- AddForeignKey
ALTER TABLE "vata_backups" ADD CONSTRAINT "vata_backups_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
