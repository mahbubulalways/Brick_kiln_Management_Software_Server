-- CreateTable
CREATE TABLE "BrickStockSummary" (
    "id" TEXT NOT NULL,
    "vataId" TEXT NOT NULL,
    "rawBrick" INTEGER NOT NULL DEFAULT 0,
    "fieldBrick" INTEGER NOT NULL DEFAULT 0,
    "stockBrick" INTEGER NOT NULL DEFAULT 0,
    "chulliBrick" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrickStockSummary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BrickStockSummary" ADD CONSTRAINT "BrickStockSummary_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
