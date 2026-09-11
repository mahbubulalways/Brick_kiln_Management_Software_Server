/*
  Warnings:

  - A unique constraint covering the columns `[vataId,name]` on the table `Season` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vataId` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Season_name_key";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "vataId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Season_vataId_isActive_idx" ON "Season"("vataId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Season_vataId_name_key" ON "Season"("vataId", "name");

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_vataId_fkey" FOREIGN KEY ("vataId") REFERENCES "vatainformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
