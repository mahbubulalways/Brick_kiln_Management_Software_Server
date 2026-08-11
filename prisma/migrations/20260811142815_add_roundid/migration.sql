/*
  Warnings:

  - You are about to drop the column `round` on the `Unload` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,roundId,classId]` on the table `Unload` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roundId` to the `Unload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Unload" DROP COLUMN "round",
ADD COLUMN     "roundId" INTEGER NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 0;

-- CreateIndex
CREATE INDEX "Unload_date_idx" ON "Unload"("date");

-- CreateIndex
CREATE INDEX "Unload_roundId_idx" ON "Unload"("roundId");

-- CreateIndex
CREATE INDEX "Unload_classId_idx" ON "Unload"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Unload_date_roundId_classId_key" ON "Unload"("date", "roundId", "classId");

-- AddForeignKey
ALTER TABLE "Unload" ADD CONSTRAINT "Unload_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
