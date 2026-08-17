/*
  Warnings:

  - A unique constraint covering the columns `[parentId,name]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Document_name_key";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "parentId" TEXT;

-- CreateIndex
CREATE INDEX "Document_parentId_idx" ON "Document"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_parentId_name_key" ON "Document"("parentId", "name");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
